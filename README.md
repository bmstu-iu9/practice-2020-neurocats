# practice-2020-neurocats
## Сайт с фотографиями котиков и нейросетью

The social network was created as part of a summer
practice from the Bauman Moscow State
Technical University. It allows users to share
photos of cats and identify their breed
using an embedded neural network.
 
## Team members:
* Yulia Hrobak - frontend, 
* Farida Bazartinova - frontend,
* Victor Florya - backend,
* Ilya Getikov machine learning/backend, 
* German Kulchitsky - machine learning.

## Чтобы запустить локально приложение необходимо:
### 1. Выкачать ветку репозитория

### 2. Запустить бэк (в папке /backend)
  - Убедитесь что у вас установлен python3
  - pip3 install virtualenv
  - pip install -r requirements.txt
  - virtualenv env
  - env\Scripts\activate.bat (каждый раз при перезапуске консоли или IDE)
  - flask run (каждый раз при перезапуске консоли или IDE)

### 3. Запуск фронта в режиме разработки (в папке /frontend)
  - yarn install
  - yarn start
  - Открыть http://localhost:3000

## Как пользоваться нашим сайтом
- Наша платформа представляет собой небольшую социальную сеть, соответсвенно необходимо в неё войти:
  - email: testmail@mail.com
  - password: qwerty
- После регистрации вы можете пользоваться почти всеми возможностями сети:
  - Просматривать фотографии котиков
  - Ставить и убирать лайки на фотографиях
  - Переходить и просматривать аккаунты других пользователей
  - Осуществлять поиск фоторафий котиков по одной из предложенных пород
  - Заполнить информацию о себе в личном кабинете
  - Редактировать данные для входа в сеть (Не работает)
  - Загружать собственные фотографии котиков, после чего нейросеть определит породу котика и добавит его к вашим фотографиям (Не работает)
  - Просматривать фотографии, добавленные пользователями на их личной странице (в галерее организована группировка по породам)
  - Выйти из сети (Не работает)
