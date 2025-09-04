import "./ModalWindow.css"

export default function ModalWindow({ modalWindow,dellTodo,todoId,switchModal}) {
  if(!modalWindow) return

  return (
    <div className="modal" onClick={switchModal}>
      <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
        <h1>Видалити запис?</h1>
        <div className="btns">
          <button onClick={() => {
            dellTodo(todoId)
            switchModal()
          }}>Так, видалити</button>
          <button onClick={switchModal}>Ні, залишити</button>
      </div>
      </div>

    </div>
  );

}
