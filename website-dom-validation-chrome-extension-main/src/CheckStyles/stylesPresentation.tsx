import React, { memo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './checkStyles.css'

import { AccordionComponent } from '../Components/Accordion/Accordion'
import { stylesTabDescription } from '../Common/tabConstants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faSquarePollVertical,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'
import { StylesProps } from '../Common/propTypes'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export const AppPresentation = memo(function ({
  objectsArray,
  handleHightlight,
  handleShowPath,
  handleClosePath,
  openFormTab,
  websiteUrl,
  errorsCount,
  showPath,
  currentPath,
}: StylesProps): JSX.Element {
  console.log('in the styles presentation')

  return (
    <div className="main-div">
      <div className="container-div">
        <div className="header-div">
          <h1 className="header-h1">Styles Validation Results</h1>
          <FontAwesomeIcon
            icon={faSquarePollVertical}
            className="header-icon"
            size="xl"
          />
        </div>
        <div className="main-container container">
          <div className="url-div">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
            <span className="url-span">
              The url getting scanned is - <a href={websiteUrl}>{websiteUrl}</a>{' '}
            </span>
          </div>
          <hr />
          <div className="page-description">
            <h4>Automated styles validation completed!</h4>
            <p>{stylesTabDescription}</p>
          </div>
          <div className="failed-instances">
            <h5>Total Failed Instances</h5>
            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
            <span className="failed-instances-span">{errorsCount}</span>
          </div>
          <h4>Failed Styles Instances per Element</h4>
          <AccordionComponent
            objectsArray={objectsArray}
            type="styles"
            handleHightlight={handleHightlight}
            handleShowPath={handleShowPath}
          />
          <Modal show={showPath} onHide={handleClosePath}>
            <Modal.Header closeButton>
              <Modal.Title>Full Path of the Element</Modal.Title>
            </Modal.Header>
            <Modal.Body>{currentPath}</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="modal-button"
                onClick={handleClosePath}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <div className="footer-div">
        <p className="footer-para">
          <a onClick={openFormTab} className="footer-anchor">
            Raise an Issue?{' '}
          </a>
          <span className="footer-span">| version 0.0.2</span>
        </p>
      </div>
    </div>
  )
})
