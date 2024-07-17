const request = require("supertest");
const app = require("../../app");
const { Task } = require("../../database/models");
const errors = require("../../const/errors");
const sequelize = require("../../db/index");

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Forzar sincronización y recreación de la base de datos
});

afterAll(async () => {
  // Desconectar Sequelize después de las pruebas
  await sequelize.close();
});

beforeEach(async () => {
  // Limpiar datos antes de cada prueba
  await Task.destroy({ where: {} });
});

//crear
describe("POST api/tasks/crear - ", () => {
  it("should create a new task and return it", async () => {
    // Datos de prueba
    //Arrange
    const taskMock = {
      title: "music",
      description: "play the guitar and sing songs on friday and saturday!",
    };

    // Envía una solicitud POST al endpoint para crear una tarea
    //Act
    const response = await request(app)
      .post("/api/tasks/crear")
      .send(taskMock)
      .expect(201);
    // Assert
    // Verifica el código de estado de la respuesta
    expect(response.status).toBe(201);

    // Verifica el contenido de la respuesta
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: taskMock.title,
        description: taskMock.description,
      })
    );
    // Verifica que la tarea se creó en la base de datos
    const createdTask = await Task.findByPk(response.body.id);
    expect(createdTask).toBeTruthy();
    expect(createdTask.title).toBe(taskMock.title);
    expect(createdTask.description).toBe(taskMock.description);
  });
  it("should give an error if task cannot be created", async () => {
    //Arrange
    let taskMock = {};
    //Act
    const response = await request(app)
      .post("/api/tasks/crear")
      .send(taskMock)
      .expect(400);
    //Assert
    expect(errors.tareaCreada.code);
    const createdTask = await Task.findByPk(response.body.id);
    expect(createdTask).toBeNull();
  });
}),
  //obtener
  describe("GET tasks", () => {
    it("should retrieve a new task", async () => {
      //arrange
      let taskMock = {
        title: "music",
        description: "play the guitar and sing songs on friday and saturday!",
        userId: 1,
      };
      // await Task.create(taskMock);
      try {
        await Task.create(taskMock);
        //act
        const res = await request(app)
          .get(`/api/tasks/obtener?usuarioId=${taskMock.userId}`)
          .expect(200);
        //assert
        expect(res.body).toHaveLength(1);
        expect(res.body[0].title).toBe(taskMock.title);

        const findTask = await Task.findAll();
        expect(findTask[0].title).toEqual(taskMock.title);

        // const task = await Task.findAll(res.body.id);
        // expect(task).toBe(res.body);
      } catch (error) {
        console.error("Error creating task:", error);
      }
    });
    it("should not retrieve a task", async () => {
      //arrange
      let userId = null;
      //act
      const res = await request(app)
        .get(`/api/tasks/obtener?usuarioId=${userId}`)
        .expect(500);
      const findTask = await Task.findAll({ where: { userId: userId } });
      //assert
      expect(findTask).toHaveLength(0);
    });
  });

//obtenerSingle
describe("Get a task", () => {
  it("should get a task by id", async () => {
    //arrange
    let taskMock = { title: "shopping", description: "buy bread" };
    const createdTask = await Task.create(taskMock);
    console.log("Task created: ", createdTask.id);
    //act
    const response = await request(app)
      .get(`/api/tasks/obtener-single/${createdTask.id}`)
      .expect(200);
    expect(response.body).toHaveProperty("id", createdTask.id);
    //assert
    expect(response.body).toHaveProperty("title", createdTask.title);
    expect(response.body).toHaveProperty("description");
    const findByPk = await Task.findByPk(createdTask.id);
    expect(findByPk).toHaveProperty("id");
    expect(findByPk).toHaveProperty("title");
    expect(findByPk).toHaveProperty("description");
  });
  it("should not retrieve a task", async () => {
    //arrange
    // let taskMock = { title: null, description: null };
    // const taskcreated = await Task.create(taskMock);
    //act
    let response = await request(app)
      .get(`/api/tasks/obtener-single/323`)
      .expect(errors.tareaInexistente.code);
  });
});
//Updata task
describe("Update task", () => {
  it("should update a task", async () => {
    //arrange
    const taskMock = {
      title: "music",
      description: "learn how to do a bass solo",
    };
    const updatedTaskData = {
      title: "music and drinks",
      description: "Jam session",
    };
    let createTask = await Task.create(taskMock);
    // let updatedaTask = await Task.update([1, [updatedTask]]);
    //act: actualizamos la tarea
    const [rows, [updatedTask]] = await Task.update(updatedTaskData, {
      where: { id: createTask.id },
      returning: true,
    });
    //assertion
    expect(rows).toBe(1);
    expect(updatedTask.title).toEqual(updatedTaskData.title);
    //act
    const res = await request(app)
      .put(`/api/tasks/${createTask.id}`)
      .expect(200)
      .send(updatedTaskData);
    //assertion
    expect(res.body.title).toBe(updatedTaskData.title);
  });
  it("should give an error if rows are 0", async () => {
    //arrange
    let taskMock = {
      title: "music",
      description: "learn how to do a bass solo",
    };
    let updateTask = {};
    let taskCreated = await Task.create(taskMock);
    const [rows, updatedTask] = await Task.update(updateTask, {
      where: { id: taskCreated.id },
    });
    expect(rows).toBe(0);
    expect(updatedTask).not.toEqual(updateTask);
    //act
    const res = await request(app)
      .put(`/api/tasks/${taskCreated.id}`)
      //  .expect(errors.tareaActualizada.code)
      .send(updateTask);
    expect(res.status).toBe(errors.tareaActualizada.code);
  });
});

describe("Delete task", () => {
  it("should delete a task", async () => {
    //Arrange
    const mockTask = {
      id: 1,
      title: "shopping",
      description: "I have to buy beer",
    };
    const createTask = await Task.create(mockTask);
    //act
    const res = await request(app)
      .delete(`/api/tasks/delete/${createTask.id}`)
      .expect(204);
    //assertion
    expect(res.body).not.toEqual(mockTask);
  });
});
