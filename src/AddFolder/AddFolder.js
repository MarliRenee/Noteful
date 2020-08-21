import React, { Component } from  'react';
import NotefulForm from '../NotefulForm/NotefulForm';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError';
import config from '../config';
//import PropTypes from 'prop-types';
import './AddFolder.css'

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: {
        value: '',
        touched: false
      }
    };  
  }
  
  static defaultProps = {
      history: {
      push: () => { }
      },
  }
  static contextType = ApiContext;

  updateFolderName(folderName) {
    this.setState({folderName: { value: folderName, touched: true} });
  }

  handleSubmit = e => {
    e.preventDefault()
    const { folderName } = this.state;
    const newFolder = { name: folderName.value } 
    fetch(`${config.API_ENDPOINT}api/folders`, {
      method: 'POST',
      body: JSON.stringify(newFolder),
      headers: {
        'content-type': 'application/json',
      }
    })
    .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
    })
    .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`api/folder/${folder.id}`)
    })
    .catch(error => {
        console.error({ error })
    })
    console.log("Folder name: ", folderName.value);
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  validateFolderName() {
    const folderName = this.state.folderName.value.trim();
    if (folderName.length === 0) {
      return '* A folder name is required';
    } else if (folderName.length < 3) {
      return 'The folder name must be at least 3 characters long';
    }
  } 

  render() {
    const folderNameError = this.validateFolderName();

    return (
        <section className='AddFolder'>
            <h2>Add a Folder</h2>
            <NotefulForm onSubmit={e => this.handleSubmit(e)}>
                <div className='field'>
                    <label htmlFor='folderName'>
                    Name
                    </label>
                    <input 
                      type='text' 
                      id='folderName' 
                      name='folderName'
                      onChange={e => this.updateFolderName(e.target.value)}    
                    />
                    {this.state.folderName.touched && (
                      <ValidationError message={folderNameError} />
                    )}
                </div>
            
                <div className='AddFolder__buttons'>
                    <button 
                      id='cancel_button' 
                      type='button' 
                      onClick={this.handleClickCancel}>
                    Cancel
                    </button>
                    {' '}
                    <button 
                      type='submit' 
                      id='save_button'
                      disabled={
                        this.validateFolderName()
                      }
                    >
                    Save
                    </button>
                </div>
            </NotefulForm>
        </section>
    );
  }
}

//AddFolder.propTypes = {
  //Prop Types Failing, value undefined
  //name: PropTypes.string.isRequired,
  //id: PropTypes.string.isRequired
//};
