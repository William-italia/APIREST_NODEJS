const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      return res.status(200).json({ message: "Nenhum usuário cadastrado!" });
    }

    res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar os usuários", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuário não encontrado no sistema!" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao buscar usuário!", error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({
      message: "Não foi possivel criar o Usuário",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.update(id, req.body);

    if (!user) {
      return res.status(404).json({
        message: "Usuário não foi encontrado!",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      message: "Não foi possivel atualizar",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.del(id);

    if (!user) {
      return res.status(400).json({
        message: "Usuário não foi encontrado!",
      });
    }

    res.status(200).json({ message: "Usuário deletado com sucesso!", user });
  } catch (error) {
    return res.status(500).json({
      message: "Não foi possivel achar Usuário",
      error: error.message,
    });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
