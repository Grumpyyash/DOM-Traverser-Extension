import React, { memo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './traverseDom.css'

import { AccordionComponent } from '../Components/Accordion/Accordion'
import { W3cAccordionComponent } from '../Components/w3cAccordion/w3cAccordion'
import {
  semanticTabDescription,
  semanticTabDomDescription,
} from '../Common/tabConstants'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faSquarePollVertical,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'
import { SemanticsProps } from '../Common/propTypes'

import Accordion from 'react-bootstrap/Accordion'
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
  handleW3C,
  showW3cErrors,
  w3cErrors,
}: SemanticsProps): JSX.Element {
  return (
    <div className="main-div">
      <div className="container-div">
        <div className="header-div">
          <h1 className="header-h1">DOM Traversal Results</h1>
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
            <h4>Automated checks complete!</h4>
            <p>{semanticTabDescription}</p>
            <p>{semanticTabDomDescription}</p>
          </div>
          <div className="failed-instances">
            <h5>Total Failed Instances</h5>
            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
            <span className="failed-instances-span">{errorsCount}</span>
          </div>
          <h4 className="accordion-heading">
            All of the Errors and Warnings per HTML Element
          </h4>
          <AccordionComponent
            objectsArray={objectsArray}
            type="semantic"
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
          <div className="external-div">
            <h4 className="external-h4">
              Check for the accessibility of the website
            </h4>
            <p className="external-note-para">
              Note: These guidelines are based on third-party APIs and follow
              latest developments
            </p>
            <div className="external-api-div">
              <p>
                <FontAwesomeIcon
                  className="search-icon"
                  icon={faMagnifyingGlass}
                />
                Check for the
                <a className="w3c-anchor" onClick={handleW3C}>
                  {' '}
                  w3c guidelines{' '}
                </a>
                for accessibility, internationalization, privacy and security
              </p>
              <p className="external-note-para">
                Note: The World Wide Web Consortium
                <a
                  href="https://www.w3.org/"
                  target="_blank"
                  className="w3c-link"
                >
                  {' '}
                  (W3C){' '}
                </a>
                is an institution responsible for developing
                <a
                  href="https://www.w3.org/standards"
                  target="_blank"
                  className="w3c-link"
                >
                  {' '}
                  standards{' '}
                </a>
                related to web. We make use of their API to give you results
                related to the accessibility of your website
              </p>
            </div>
            {showW3cErrors && (
              <Accordion defaultActiveKey="0">
                {w3cErrors.error.length && (
                  <W3cAccordionComponent
                    errorsArray={w3cErrors.error}
                    uniqueKey="1"
                    type="errors"
                  />
                )}
                {w3cErrors.error.length > 0 && (
                  <W3cAccordionComponent
                    errorsArray={w3cErrors.warning}
                    uniqueKey="2"
                    type="warnings"
                  />
                )}
                {w3cErrors.error.length && (
                  <W3cAccordionComponent
                    errorsArray={w3cErrors.info}
                    uniqueKey="3"
                    type="info"
                  />
                )}
              </Accordion>
            )}
          </div>
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
