/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data,(err, response)=> {
      if (response.success === true) {
        document.activeElement.closest('.modal').querySelector('form').reset()
        new Modal(document.activeElement.closest('.modal')).close()
        App.update() 
      }
    })
  }
}