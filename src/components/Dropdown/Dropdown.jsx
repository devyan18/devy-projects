// import styles from './styles/Dropdown.module.css';

const Dropdown = ({ isOpen, onClick, onChange, data, selected }) => {
  const taskNameFormed = (name) => {
    return `${name[0].toUpperCase()}${name.slice(1)}`;
  };

  return (
    <div className={`dropdown ${isOpen && 'open'}`}>
      <div className="control item" onClick={onClick}>
        <span className="left">
          <span className="name">
            {taskNameFormed(selected?.task_description)}
          </span>
        </span>
        <span className="right">
          <i className="icon chevron-down" />
        </span>
      </div>
      <div className="menu">
        {data?.map((item) => {
          return (
            <div
              className={`item ${item._id === selected._id && 'selected'}`}
              key={item._id}
              onClick={() => onChange(item._id)}
            >
              <span className="name">
                {taskNameFormed(item.task_description)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
