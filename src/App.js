import { useEffect, useState } from 'react';
import { IoFolderOutline } from 'react-icons/io5';
import './App.css';

function App() {
  const [data, setData] = useState({
    path: '',
    files: [],
  });

  const folderClickHadler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000${e.target.attributes.href.value}`)
      .then((res) => res.json())
      .then(
        (response) => {
          // setParent('');
          setData(response);
        },
        (err) => {}
      );
  };

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then((res) => res.json())
      .then(
        (response) => {
          // setParent('');
          setData(response);
        },
        (err) => {}
      );
  }, []);

  return (
    <div className="file-manager">
      <ul className="folder-list">
        {data?.files.map((file) => {
          if (file.dir) {
            return (
              <li key={file.name} className="list-item dir">
                <a
                  href={data.path + '/' + file.name}
                  alt={`${file.name}`}
                  onClick={folderClickHadler}
                >
                  <IoFolderOutline /> {file.name}
                </a>{' '}
              </li>
            );
          } else {
            return (
              <li key={file.name} className="list-item file">
                {file.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default App;
