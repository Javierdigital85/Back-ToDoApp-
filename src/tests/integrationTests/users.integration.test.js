const request = require("supertest");
const app = require("../../app");
const { User } = require("../../database/models");
const errors = require("../../const/errors");
const sequelize = require("../../db/index");
const { generateToken } = require("../../config/tokens");

// Antes de ejecutar las pruebas, sincronizamos los modelos con la base de datos de prueba
beforeAll(async () => {
  await sequelize.sync({ force: true }); // Sincronizar los modelos y forzar la creación de tablas
});

// Después de todas las pruebas, cierra la conexión con la base de datos de prueba
afterAll(async () => {
  await sequelize.close(); // Cerrar la conexión de Sequelize
});

beforeEach(async () => {
  await User.destroy({ where: {} });
});

// Register
describe("POST /api/usuarios/register", () => {
  it("should register a new user when posting /api/usuarios/register", async () => {
    let userMock = {
      name: "javier",
      email: "javiercolodro@gmail.com",
      country: "Argentina",
      password: "HolaJavi38",
      profesion: "Software Developer",
    };

    // const createUser = await User.create(userMock);
    const res = await request(app)
      .post("/api/usuarios/register")
      .expect(201)
      .send(userMock);
    //Verifica que la tarea se creo
    const createdTask = await User.findByPk(res.body.id);
    expect(createdTask.name).toBe(userMock.name);
  });

  it("should give an error if user request not found", async () => {
    const userMock = {};
    const res = await request(app)
      .post("/api/usuarios/register")
      .send(userMock)
      .expect(errors.faltanCampos.code);
    expect(res.body).toEqual({
      success: false,
      error: {
        code: errors.faltanCampos.code,
        message: errors.faltanCampos.message,
      },
    });
  });
});

// Login
describe("POST login ", () => {
  it("should login a user with valid credentials", async () => {
    const createUser = {
      name: "Lorenzo",
      profesion: "Software Developer",
      email: "lorenzo@gmail.com",
      password: "Lorenzo38",
      country: "Argentina",
    };
    await User.create(createUser);
    let loginUser = {
      email: createUser.email,
      password: createUser.password,
    };
    const res = await request(app)
      .post("/api/usuarios/login")
      .send(loginUser)
      .expect(200);
    expect(res.body).toHaveProperty("name");
  });
  it("should not login if user does not exist", async () => {
    await request(app)
      .post("/api/usuarios/register")
      .expect(errors.usuarioInexistente.code);
  });
});
//logout
describe("POST logout", () => {
  it("should log out the user", async () => {
    await request(app).post("/api/usuarios/logout").expect(204);
  });
});

//me
describe("Get /me", () => {
  it("should retrieve user info", async () => {
    const mockUser = {
      name: "Sonia",
      profesion: "Software Developer",
      email: "sonia@gmail.com",
      password: "sonia38",
      country: "Argentina",
    };
    const createdUser = await User.create(mockUser);
    const token = generateToken({ id: createdUser.id });
    const res = await request(app)
      .get("/api/usuarios/me")
      .set("Cookie", [`token=${token}`])
      .expect(200);
  });
});
//listarInfo
describe("GET info ", () => {
  it("should find user by id", async () => {
    const mockUser = {
      name: "Luz",
      profesion: "Software Developer",
      email: "Luz@gmail.com",
      password: "luz38",
      country: "Argentina",
    };
    let createUser = await User.create(mockUser);
    let userId = createUser.id;

    const res = await request(app)
      .get(`/api/usuarios/usuario/${userId}`)
      .expect(200);
    let findId = await User.findByPk(createUser.id);
    expect(findId).toHaveProperty("email");
  });
  it("should give an error if id is not provided", async () => {
    const res = await request(app)
      .get(`/api/usuarios/usuario/`)
      .expect(errors.usuarioInexistente.code);
  });
});

describe("Get /api/usuarios/todos", () => {
  it("should retrieve all the users", async () => {
    let usersMock = [
      {
        name: "Naruto Uzumaki",
        profesion: "Ninja",
        email: "naruto.doe@example.com",
        password: "kyubi",
        country: "Hidden Leaf Village",
      },
      {
        name: "Sasuke Uchiha",
        profesion: "Ninja",
        email: "sasuke@gmail.com",
        password: "avenger",
        country: "Hidden Leaf Village",
      },
    ];
    const userCreated = await User.bulkCreate(usersMock);
    const res = await request(app)
      .get("/api/usuarios/todos")
      .expect(200)
      .send(userCreated);
    expect(res.body.length).toBeGreaterThan(0);
  });
  it("should handle error", async () => {
    await request(app)
      .get("/api/usuarios/todos3fd")
      .expect(errors.usuarioInexistente.code);
  });
});

describe("Delete", () => {
  it("should delete a user", async () => {
    let userId = 1;
    await User.destroy({ where: { id: userId } });
    const res = await request(app)
      .delete(`/api/usuarios/${userId}`)
      .expect(202);
  });

  it("should give an error when user can not be eliminated", async () => {
    await request(app)
      .delete(`/api/usuarios/`)
      .expect(errors.usuarioInexistente.code);
  });
});
