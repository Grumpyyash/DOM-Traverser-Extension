import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './form.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

import { Form, Button } from 'react-bootstrap'

const App = (): JSX.Element => {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (name === '' || subject === '' || message === '') return

    let mailtoLink = 'mailto:yash.vardhan@sprinklr.com'
    mailtoLink += `?subject=${subject}`
    mailtoLink += `&body=Name: ${name}`
    mailtoLink += `%OAmessage: ${message}`
    window.location.href = mailtoLink
  }

  return (
    <div className="main-div">
      <div className="container-div">
        <div className="header-div">
          <h1 className="header-h1">Feedback and Issues</h1>
          <FontAwesomeIcon icon={faFile} className="header-icon" size="xl" />
        </div>
        <div className="main-container container">
          <h3>Got into issues or have a feedback?</h3>
          <p className="form-description">
            Please write to us if you find any issues while using this extension
            or if you have any feedback
          </p>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first and last name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Subject</Form.Label>
              <Form.Select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                aria-label="Default select example"
              >
                <option>Choose from dropdown</option>
                <option value="faced-an-issue">
                  Faced an issue while using the extension
                </option>
                <option value="got-wrong-result">
                  Extension giving wrong results
                </option>
                <option value="give-feedback">
                  Wanted to submit a feedback
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={5}
                placeholder="Please describe your query in detail"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
            <Button className="form-submit-button" type="submit">
              Mail to us
            </Button>
          </Form>
        </div>
      </div>
      <div className="footer-div">
        <p className="footer-para">
          <span className="footer-span">version 0.0.2</span>
        </p>
      </div>
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
