import React,{useState} from 'react';
import Tesseract from 'tesseract.js';
import './App.css';


const pdfjs = require('pdfjs-dist/build/pdf');




const App = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [text, setText] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  
  const handleSubmit = () => {
    /* console.log(image);
    if(getItems(image)){

    }else{ */
      setIsLoading(true);
      Tesseract.recognize(image, ['eng', 'ara'], {
        logger: (m) => {
          console.log(m);
          if (m.status === 'recognizing text') {
            setProgress(parseInt(m.progress * 100));
          }
        },
      })
        .catch((err) => {
          console.error(err);
        })
        .then((result) => {
          console.log(result.data);
          setText(result.data.text);
          setIsLoading(false);
        });
    /* } */
    
/*     async function getContent(src){
      const doc = await pdfjs.getDocument(src).promise
      const page = await doc.getPage(1)
      return await page.getTextContent()
    }
    
    async function getItems(src){
      const content = await getContent(src)
      console.log(content.items)
      var pdftext='';
      const items = content.items.map((item) => {
        pdftext = pdftext + item.str;
      })
      setText(pdftext);
      console.log(pdftext);
      return items
    } */

    
      
    
  };

  return (
    <div className="container" style={{ height: '100vh' }}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto h-100 d-flex flex-column justify-content-center">
          {!isLoading && (
            <h1 className="text-center py-5 mc-5">Image To Text</h1>
          )}
          {isLoading && (
            <>
              <progress className="form-control" value={progress} max="100">
                {progress}%{' '}
              </progress>{' '}
              <p className="text-center py-0 my-0">Converting:- {progress} %</p>
            </>
          )}
          {!isLoading && !text && (
            <>
              <input
                type="file"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
                className="form-control mt-5 mb-2"
              />
              <input
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mt-5"
                value="Convert"
              />
            </>
          )}
          {!isLoading && text && (
            <>
              <textarea
                className="form-control w-100 mt-5"
                rows="30"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
