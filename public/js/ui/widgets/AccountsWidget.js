/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */


class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
      if(!element) {
        throw new Error('Ошибка');
      } else {
        this.element = element;
        this.registerEvents();
        this.update();
      }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.onSelectAccount(this.element);
    document.querySelector('.create-account ').onclick = () => {
      App.getModal('createAccount').open();

    }
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    Account.list(User.current(),(err, response)=> {
      if (response.success === true) {
        this.clear()
        response.data.forEach(el => {
          this.renderItem(el)
        });
      }
    })
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    Array.from(document.querySelectorAll('.account')).forEach((el) => {
      el.remove();
    })
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    element.addEventListener('click',(e) => {
      if (element.querySelector('.active')) {
        element.querySelector('.active').classList.remove('active');
        e.target.closest('li').classList.add('active');
        
      } else {
        e.target.closest('li').classList.add('active');
      }
      App.showPage( 'transactions', { account_id: e.target.closest('li').dataset.id})
    })
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    return `<li class="account" data-id=${item.id}>
    <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum}</span>
    </a>
  </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    document.querySelector('.accounts-panel .header').insertAdjacentHTML('afterend', this.getAccountHTML(data));
  }
}
