const User = require('../models/User')

const getUsers = (req, res) => {
    User.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
          });
}

const addUser = async (req, res) => {
    try {
      if (req.body) {
        console.log('Получен запрос на сохранение пользователя:', req.body);
        const { name, password, email } = req.body;
        const user = new User({ name, password, email });
        const result = await user.save();
        console.log('Пользователь сохранен:', result);
        res.send(result);
      } else {
        console.log('Тело запроса пустое');
        res.status(400).send('Текст сообщения не найден в теле запроса');
      }
    } catch (error) {
      console.error('Ошибка при сохранении пользователя:', error);
      res.status(500).send('Ошибка при сохранении пользователя');
    }
  }

  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.status(200).send(`Пользователь с ID ${id} был удален.`);
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
      res.status(500).send('Ошибка при удалении пользователя');
    }
  }

  const editUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
      res.status(500).send('Ошибка при обновлении пользователя');
    }
  }

  module.exports = {
    getUsers,
    addUser,
    deleteUser,
    editUser
  }