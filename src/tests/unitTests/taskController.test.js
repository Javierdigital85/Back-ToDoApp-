const errors = require("../../const/errors");
const {
  crear,
  obtener,
  obtenerSingle,
  updateTask,
  deleteTask,
} = require("../../controllers/task.controller");
const { Task } = require("../../database/models");

jest.mock("../../database/models");

//Create a task
describe("New task", () => {
  //Entrada de la solicitud
  let req, res;
  req = {
    body: {
      title: "sports",
      description: "tennis",
    },
  };
  //Simulacion de la respuesta http
  res = {
    status: jest.fn(),
    send: jest.fn(),
  };
  //simulacion de la funcion next para manejar
  const next = jest.fn();
  //Simulacion de la base de datos,simula devolver un objeto
  it("should create a new task", async () => {
    Task.create.mockResolvedValueOnce({
      id: 1,
      title: "sports",
      description: "tennis",
    });
    await crear(req, res, next);
    //La prueba verifica que el controlador responde con el objeto creado y el código de estado esperado.
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("should retrieve an error while creating a new task", async () => {
    const errorMessage = "Error while creating a new task";
    Task.create.mockRejectedValueOnce(new Error(errorMessage));
    await crear(req, res, next);
    expect(next).toHaveBeenCalledWith(errors.tareaCreada);
  });
});

//Obtener todas las tareas
describe("List the user tasks", () => {
  let req, res;
  req = {
    query: {
      userId: 1,
    },
  };
  res = {
    status: jest.fn(),
    send: jest.fn(() => res),
  };
  const next = jest.fn();
  it("should retrieve the tasks that belongs to the user", async () => {
    Task.findAll.mockResolvedValueOnce([{ userId: 1 }]);
    await obtener(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should retrieve all task when user in not provided", async () => {
    let req, res;
    req = {
      query: {},
    };
    res = {
      send: jest.fn(),
      status: jest.fn(),
    };
    const mockResponse = [{ userId: 1 }];
    Task.findAll.mockResolvedValueOnce(mockResponse);
    await obtener(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// Obtener una tarea
describe("get a single task", () => {
  let req, res, next;
  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return a single task from the user", async () => {
    req = {
      params: { id: 1 },
    };
    const mockTask = { id: 3, title: "Sports", description: "Tennis" };

    Task.findByPk.mockResolvedValueOnce(mockTask);
    await obtenerSingle(req, res, next);
    expect(Task.findByPk).toHaveBeenCalledWith(1);
    expect(res.send).toHaveBeenCalledWith(mockTask);
  });

  it("should return an error if task does not exist", async () => {
    req = {
      params: {},
    };
    Task.findByPk.mockResolvedValueOnce(null);
    await obtenerSingle(req, res, next);
    expect(next).toHaveBeenCalledWith(errors.tareaInexistente);
  });
});

// Actualizar una tarea
describe("Update Tasks", () => {
  let req, res, next;
  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn(),
    };
    req = {
      params: { id: 1 },
      body: {
        title: "libro",
        description: "Hobbit",
      },
    };
    next = jest.fn();
  });
  it("should update a task", async () => {
    const mockTask = {
      id: 1,
      title: "libro",
      description: "hobbit",
    };
    Task.findByPk.mockResolvedValueOnce(mockTask);
    Task.update.mockResolvedValueOnce([1, mockTask]);

    await updateTask(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should not retrieve an error if rows are 0", async () => {
    const mockTask = [];
    Task.findByPk.mockResolvedValueOnce(mockTask);
    Task.update.mockResolvedValueOnce([0, mockTask]);
    await updateTask(req, res, next);
    expect(res.status).toHaveBeenCalledWith(errors.tareaActualizada.code);
    // expect(res.send).toHaveBeenCalledWith(errors.tareaActualizada.message);
  });
});

//Eliminamos la tarea
describe("Delete Task", () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      params: {
        id: 1,
      },
    };
    res = {
      sendStatus: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();
  });
  it("should delete a task by id", async () => {
    const mockTask = { id: 1 };
    Task.findByPk.mockResolvedValueOnce(mockTask);
    await deleteTask(req, res, next);
    expect(res.sendStatus).toHaveBeenCalledWith(204);
    expect(Task.findByPk).toHaveBeenCalledWith(req.params.id);
  });
  it("should give an error if task not found", async () => {
    const mockTask = { id: null };
    Task.findByPk.mockResolvedValueOnce(mockTask);
    await deleteTask(req, res, next);
    expect(Task.destroy).not.toHaveBeenCalledWith();
    //expect(next).toHaveBeenCalledWith(errors.taskDelete.message);
  });
});

/* 
Este enfoque asegura que la prueba refleje correctamente cómo el controlador debería comportarse cuando se interactúa con la base de datos, incluso si en la prueba la base de datos está siendo simulada.
*/
