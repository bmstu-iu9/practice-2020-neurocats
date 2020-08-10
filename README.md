# practice-2020-neurocats
Сайт с фотографиями котиков и нейросетью

The social network was created as part of a summer
practice from the Bauman Moscow State
Technical University. It allows users to share
photos of cats and identify their breed
using an embedded neural network.
 
Team members:
* Yulia Hrobak - frontend, 
* Farida Bazartinova - frontend,
* Victor Florya - backend,
* Ilya Getikov machine learnin/backend, 
* German Kulchitsky - machine learning.

Чтобы запустить локально приложение необходимо:
1. Выкачать ветку репозитория

2. Запустить бэк (в папке /backend)
  1.Убедитесь что у вас установлен python3
  2. pip3 install virtualenv
  3. pip install -r requirements.txt
  4. virtualenv env
  5. env\Scripts\activate.bat (каждый раз при перезапуске консоли или IDE)
  6. flask run (каждый раз при перезапуске консоли или IDE)

3. Запуск статического фронта - открыть url, на котором работает бэкенд. (Статический фронт будет обновляться раз в пару дней по достижении существенного прогресса)

4. Запуск фронта в режиме разработки (в папке /frontend)
  1. yarn install
  2. yarn start
  3. Открыть http://localhost:3000
