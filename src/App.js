import { useEffect, useState } from 'react';
import { IoFolderOutline } from 'react-icons/io5';
import './App.css';

function App() {
  const [parent, setParent] = useState('');
  const [data, setData] = useState({
    path: '',
    files: [],
  });

  const fetchFiles = (path) => {
    fetch(path)
      .then((res) => res.json())
      .then(
        (response) => {
          setData(response);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const folderClickHadler = (e) => {
    e.preventDefault();
    fetchFiles(`http://localhost:8000/?path=${e.target.attributes.href.value}`);
  };

  useEffect(() => {
    fetchFiles('http://localhost:8000/');
  }, []);

  useEffect(() => {
    const pathArr = data.path.split('/');
    pathArr.pop();
    setParent(pathArr.join('/'));
  }, [data.path]);

  const sortedData = [
    ...data.files.filter((file) => file.dir),
    ...data.files.filter((file) => !file.dir),
  ];

  const currentFiles = sortedData.map((file) => {
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
  });

  return (
    <div className="file-manager">
      <ul className="folder-list">
        <li href={parent} onClick={folderClickHadler} className="folder-up">
          /..
        </li>
        {currentFiles}
      </ul>
    </div>
  );
}

export default App;
