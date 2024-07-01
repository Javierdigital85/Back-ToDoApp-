//const request = require("supertest");
const { User } = require("../../database/models");
const {
  register,
  eliminar,
  login,
  listarInfo,
  logout,
  todos,
  me,
} = require("../../controllers/usuario.controller");

const errors = require("../../const/errors");

jest.mock("../../database/models");

// REGISTER
describe("Register user", () => {
  let req, res;
  req = {
    body: {
      email: "fake_email",
      password: "fake_password",
      name: "Javier",
    },
  };

  res = {
    status: jest.fn((x) => x),
    send: jest.fn((x) => x),
  };

  it("should send a status code of 201 when new user is created", async () => {
    User.findOne.mockResolvedValueOnce(null);
    User.create.mockResolvedValueOnce({
      id: 1,
      email: "javiercolodro@gmail.com",
      password: "casaJavi",
    });
    await register(req, res);
    // Debugging log statements

    expect(res.status).toHaveBeenCalledWith(201);
    expect(User.create).toHaveBeenCalledWith(req.body);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(Number) })
    );
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ email: "javiercolodro@gmail.com" })
    );

    console.log("res.status mock calls:", res.status.mock.calls);
    console.log("res.send mock calls:", res.send.mock.calls);
  });

  it("should send a status code of 400 when user exists", async () => {
    User.findOne.mockImplementationOnce(() => ({
      email: "walter@gmail.com",
      password: "password",
    }));
    await register(req, res);
    // Verifica que se haya llamado a res.status(400)
    expect(res.status).toHaveBeenCalledWith(400);
    // Verifica que se haya llamado a res.send con el mensaje de error adecuado
    expect(res.send).toHaveBeenCalledTimes(1);
  });
});

//LOG IN
describe("Log in", () => {
  let req, res;
  req = {
    body: {
      name: "javier",
      password: "Argentina",
      email: "javier@gmail.com",
    },
  };
  res = {
    send: jest.fn((x) => x),
    status: jest.fn((x) => x),
    sendStatus: jest.fn((x) => x),
  };

  it("should give an error if user does not exist", async () => {
    User.findOne.mockResolvedValueOnce(null);
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(errors.usuarioInexistente.code);
  });
});

// GET USER BY ID
describe("Get user by id", () => {
  let req, res;
  req = {
    params: {
      userId: 1,
    },
  };
  res = {
    send: jest.fn((x) => x),
    status: jest.fn(() => res),
  };
  next = jest.fn();

  it("should get user by id", async () => {
    User.findByPk.mockResolvedValueOnce({
      id: 1,
      email: "javiercolodro@gmail.com",
      password: "hola",
    });
    await listarInfo(req, res, next);
    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalledWith(errors.usuarioInexistente);
    // expect(next).toHaveBeenCalledWith({});
  });

  it("should call status usuarioInexistente", async () => {
    User.findByPk.mockResolvedValueOnce(null);

    await listarInfo(req, res, next);
    expect(next).toHaveBeenCalledWith(errors.usuarioInexistente);
    // expect(res.send).toHaveBeenCalledTimes(1);
  });
});

// DELETE
describe("Delete User", () => {
  let req, res;
  req = {
    params: {
      userId: 1,
    },
  };
  res = {
    send: jest.fn((x) => x),
    status: jest.fn((x) => x),
  };
  it("should send a 202 when user is deleted", async () => {
    User.findByPk.mockResolvedValueOnce({
      id: 3,
      email: "hello@gmail.com",
    });
    await eliminar(req, res);
    expect(res.send).toHaveBeenCalledWith(202);
  });
});

describe("Log out", () => {
  let req, res;
  const mockUser = { id: 1, name: "javier" };
  req = { user: mockUser };
  res = {
    clearCookie: jest.fn(),
    sendStatus: jest.fn(),
  };
  it("should eliminate token cookie and send a 204 status", async () => {
    await logout(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith("token");
    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });
});

describe("Get in /me", () => {
  let req, res;
  const mockUser = { id: 1, name: "Javier Colodro" };
  //usamos beforeEach para simular el middleware
  beforeEach(() => {
    // Arrange (Configuración inicial)
    req = { user: mockUser };
    res = {
      send: jest.fn(),
    };
  });
  it("should retrieve user information", async () => {
    // Act (Acción: Llamar al controlador 'me' con req y res)
    await me(req, res);
    // Assert (Verificación: Comprobar que res.send fue llamado con mockUser)
    expect(res.send).toHaveBeenCalledWith(mockUser);
  });
});

describe("Get all users", () => {
  let req, res;
  const mockUsers = [
    { email: "hola", name: "javier" },
    { email: "saludos", name: "lorenzo" },
  ];
  req = { mockUsers };
  res = {
    send: jest.fn(),
    status: jest.fn(() => res), //res.status(200).send(user);
  };
  it("it should return an status 200", async () => {
    User.findAll.mockResolvedValueOnce(mockUsers);
    await todos(req, res);
    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledWith(mockUsers);
    expect(res.send).toHaveBeenCalledTimes(1);
  });
});
