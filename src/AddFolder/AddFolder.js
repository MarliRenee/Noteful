import React, { Component } from  'react';
import PropTypes from 'prop-types';
import NotefulForm from '../NotefulForm/NotefulForm';
import ApiContext from '../ApiContext';
import config from '../config';

export default class AddFolder extends Component {

    static defaultProps = {
        history: {
        push: () => { }
        },
    }
    static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      name: e.target['folderName'].value,
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      body: JSON.stringify(folder),
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
        this.props.history.push(`/folder/${folder.id}`)
    })
    .catch(error => {
        console.error({ error })
    })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  render() {
    return (
        <section className='AddFolder'>
            <h2>Add a Folder</h2>
            <NotefulForm onSubmit={this.handleSubmit}>
                <div className='field'>
                    <label htmlFor='folder-name-input'>
                    Name
                    </label>
                    <input type='text' id='folder-name-input' name='folderName' />
                </div>
            
                <div className='AddFolder__buttons'>
                    <button type='button' onClick={this.handleClickCancel}>
                    Cancel
                    </button>
                    {' '}
                    <button type='submit'>
                    Save
                    </button>
                </div>
            </NotefulForm>
        </section>
    );
  }
}
