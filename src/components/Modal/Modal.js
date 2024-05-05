const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div
      style={{
        display: isOpen ? 'block' : 'none',
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0,0,0,0.4)',
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: '#fefefe',
          margin: '15% auto',
          padding: '20px',
          border: '1px solid #888',
          width: '80%',
        }}
      >
        <span className="close" style={{ color: '#aaa', float: 'right', fontSize: '28px', fontWeight: 'bold' }} onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
