import view from './post.html';
import './estilos-post.css';
import '../firebase-functions/firebaseConfig';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = view;

  return divElement;
};
