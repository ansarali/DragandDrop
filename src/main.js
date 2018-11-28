import React from 'react'
import ReactDOM from 'react-dom'
import Dropzone from "react-dropzone"

    class App extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                files: [],
                showImg:""
            }
            this.handleClick = this.handleClick.bind(this);
            this.onDrop = this.onDrop.bind(this);
        }

        handleClick (){
           this.setState({showImg:true})
        }
      
        onDrop(files) {
            this.setState({
              files: files.map(file => ({
                ...file,
                filedata:file,
                preview: URL.createObjectURL(file)
              }))
            ,showImg:false});
          }
        
          componentWillUnmount() {
            const {files} = this.state;
            for (let i = files.length; i >= 0; i--) {
              const file = files[0];
              URL.revokeObjectURL(file.preview);
            }
          }

        render (){
            const dzStyle = {
                cursor: "hand", minHeight: "200px", borderWidth: "2px", borderColor: "#666",
                borderStyle: "dashed", borderRadius: "5px", textAlign: "center", paddingTop: "65px"
            };

            const thumb = {
                display: 'inline-flex',
                borderRadius: 2,
                border: '1px solid #eaeaea',
                marginBottom: 8,
                marginRight: 8,
                width: '100%',
                padding: 4,
                boxSizing: 'border-box'
            };
              
            const thumbInner = {
            display: 'flex',
            minWidth: 0,
            overflow: 'hidden'
            }
              
            const img = {
            display: 'block',
            width: '100%',
            height: '100%'
            };
            const {files, filedata, showImg} = this.state;
           
            const thumbs = files.map(file => (
                <div style={thumb}>
                    <div style={thumbInner}>
                    <img
                        src={file.preview}
                        style={img}
                    />
                    </div>
                </div>
               
            ));

            const info = files.map(file => (
                    <p>
                        {file.filedata.name}
                    </p>
            ));
           
            return (
                <div>
					<Header />
                    <Dropzone 
                        onDrop={this.onDrop} 
                        style={dzStyle} 
                        accept="image/*"
                        multiple={false} >
                        <div>
                             <span>Drop Files Here or Click to Upload</span>
                        </div>
                        <br />
                        {info}
                    </Dropzone>
                    <input style={{"marginTop":"15px"}} onClick={this.handleClick} type="submit" value="Show Image" />
                    {showImg ?
                    <div> {thumbs} </div>
                    : ""}
                </div>
            )
        }
    }
	
    class Header extends React.Component {
        constructor(props){
            super(props);
           
        }
      
        render (){
            return (
                <h1>
                   Drag and Drop
                </h1>
            )
        }
    }	



ReactDOM.render(
    <App />,
    document.getElementById('root')
)