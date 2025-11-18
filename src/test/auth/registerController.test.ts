// tests/auth/infrastructure/http/controllers/registerController.test.ts

import type { createUserService } from "../../auth/application/services/createUserService";
import type { findByEmail } from "../../auth/application/services/findByEmailService";
import type { PasswordHashingService } from "../../auth/application/services/hashingCompare/passwordHashingService";
import { User } from "../../auth/domain/entities/User";
import { userEmail } from "../../auth/domain/valueObjects/userEmail";
import { userID } from "../../auth/domain/valueObjects/userID";
import { userName } from "../../auth/domain/valueObjects/userName";
import { userPassword } from "../../auth/domain/valueObjects/userPassword";
import { userPhone } from "../../auth/domain/valueObjects/userPhone";
import { UserRole } from "../../auth/domain/valueObjects/userRole";
import { RegisterController } from "../../auth/infrastructure/http/controllers/registerController";

// Mocks
const mockCreateUserService: jest.Mocked<createUserService> = {
  execute: jest.fn(),
} as any;

const mockFindByEmailService: jest.Mocked<findByEmail> = {
  execute: jest.fn(),
} as any;

const mockPasswordService: jest.Mocked<PasswordHashingService> = {
  execute: jest.fn(),
} as any;

describe("RegisterController", () => {
  let registerController: RegisterController;

  beforeEach(() => {
    jest.clearAllMocks();
    registerController = new RegisterController(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      mockCreateUserService,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      mockFindByEmailService,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      mockPasswordService
    );
  });

  describe("execute", () => {
    const mockRequest = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "Test1234!",
        phone: "1234567890",
      },
    };

    const mockResponse: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    it("debería registrar un nuevo usuario exitosamente", async () => {
      // Arrange
      const mockUser = new User(
        new userID("123"),
        new userName("testuser"),
        new userEmail("test@example.com"),
        new userPassword("hashedpassword"),
        UserRole.USER,
        true,
        new userPhone("1234567890"),
        new Date()
      );

      mockFindByEmailService.execute.mockResolvedValue(null);
      mockPasswordService.execute.mockResolvedValue("hashedpassword");
      mockCreateUserService.execute.mockResolvedValue(mockUser);

      // Act
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await registerController.execute(mockRequest as any, mockResponse);

      // Assert
      expect(mockFindByEmailService.execute).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(mockPasswordService.execute).toHaveBeenCalledWith("Test1234!");
      expect(mockCreateUserService.execute).toHaveBeenCalledWith(
        null,
        "testuser",
        "hashedpassword",
        "test@example.com",
        UserRole.USER,
        "1234567890"
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: "Usuario registrado exitosamente",
          data: expect.any(Object),
        })
      );
    });

    it("debería devolver un error si el email ya está en uso", async () => {
      // Arrange
      const existingUser = new User(
        new userID("123"),
        new userName("existinguser"),
        new userEmail("test@example.com"),
        new userPassword("hashedpassword"),
        UserRole.USER,
        true,
        new userPhone("1234567890"),
        new Date()
      );

      mockFindByEmailService.execute.mockResolvedValue(existingUser);

      // Act
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await registerController.execute(mockRequest as any, mockResponse);

      // Assert
      expect(mockFindByEmailService.execute).toHaveBeenCalledWith(
        "test@example.com"
      );
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "El correo electrónico ya está en uso",
      });
    });

    it("debería manejar errores inesperados", async () => {
      // Arrange
      mockFindByEmailService.execute.mockRejectedValue(
        new Error("Error inesperado")
      );

      // Act
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await registerController.execute(mockRequest as any, mockResponse);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Error al registrar el usuario",
        error: "Error inesperado",
      });
    });

    it("debería validar que todos los campos sean requeridos", async () => {
      // Arrange
      const invalidRequest = {
        body: {
          // Faltan campos requeridos
        },
      };

      // Act
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await registerController.execute(invalidRequest as any, mockResponse);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: "Todos los campos son obligatorios",
      });
    });
  });
});
