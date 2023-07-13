import React, { memo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './checkDensity.css'

import { AccordionComponent } from '../Components/Accordion/Accordion'
import { densityTabDescription } from '../Common/tabConstants'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faSquarePollVertical,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'
import { DensityProps } from '../Common/propTypes'

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
}: DensityProps): JSX.Element {
  return (
    <div className="main-div">
      <div className="container-div">
        <div className="header-div">
          <h1 className="header-h1">Density Validation Results</h1>
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
            <h4>Automated density validation completed!</h4>
            <p>{densityTabDescription}</p>
          </div>
          <div className="failed-instances">
            <h5>Total Failed Instances</h5>
            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
            <span className="failed-instances-span">{errorsCount}</span>
          </div>
          <h4>Failed Styles Instances per Element</h4>
          <AccordionComponent
            objectsArray={objectsArray}
            type="density"
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
