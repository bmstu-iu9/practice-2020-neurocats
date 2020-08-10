  # practice-2020-neurocats
## Сайт с фотографиями котиков и нейросетью

The social network was created as part of a summer
practice from the Bauman Moscow State
Technical University. It allows users to share
photos of cats and identify their breed
using an embedded neural network.
 
## Team members:
* [Yulia Hrobak](https://github.com/yukhrobak/) - frontend, 
* [Farida Bazartinova](https://github.com/farichase/) - frontend,
* [Victor Florya](https://github.com/FloryaVictor/) - backend,
* [Ilya Getikov](https://github.com/IlyaGetikov/) - machine learning/backend, 
* [German Kulchitsky](https://github.com/jetsnake/) - machine learning.

## Чтобы запустить локально приложение необходимо:
### 1. Выкачать ветку репозитория

### 2. Запустить бэк (в папке /backend)
  - Убедитесь что у вас установлен python3
  - pip3 install virtualenv
  - python -m venv name
  - name\Scripts\activate.bat (каждый раз при перезапуске консоли или IDE)
  - pip install -r requirements.txt
  - flask run (каждый раз при перезапуске консоли или IDE)

### 3. Запуск фронта в статическом режиме - достаточно открыть url на котором запущен сервер (Обновляется раз в пару дней, по достижении прогресса)
### 3.2 Запуск фронта в режиме разработки (в папке /frontend)
  - yarn install
  - yarn start
  - Открыть http://localhost:3000

## Как пользоваться нашим сайтом
- Наша платформа представляет собой небольшую социальную сеть, вы можете зарегистрироваться или войти под тестовым юзером:
  - email: testmail@mail.com
  - password: qwerty
- После входа вы можете пользоваться почти всеми возможностями сети:
  - Просматривать фотографии котиков
  - Ставить и убирать лайки на фотографиях
  - Переходить и просматривать аккаунты других пользователей
  - Осуществлять поиск фоторафий котиков по одной из предложенных пород
  - Заполнить информацию о себе в личном кабинете
  - Редактировать данные для входа в сеть
  - Загружать собственные фотографии котиков, после чего нейросеть определит породу котика и добавит его к вашим фотографиям
  - Просматривать фотографии, добавленные пользователями на их личной странице (в галерее организована группировка по породам)
  - Выйти из сети
