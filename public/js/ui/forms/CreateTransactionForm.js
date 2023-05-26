/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(),(err, response)=> {
      if (response.success === true) {
        [...document.querySelectorAll('.accounts-select')].forEach ((el)=> {
          el.innerHTML = '';
          for(let elem of response.data) {
            el.insertAdjacentHTML('afterbegin',`<option value="${elem.id}">${elem.name}</option>`);
          }
        }) 
        
        //   response.data.forEach((el) => {
        //   document.querySelector('#expense-accounts-list').
        //   insertAdjacentHTML('afterbegin',`<option value="${el.id}">${el.name}</option>`);
        // });
       
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data,(err, response)=> {
      if (response.success === true) {
        document.activeElement.closest('.modal').querySelector('form').reset()
        new Modal(document.activeElement.closest('.modal')).close()
        App.update() 
      }
    })
  }
}