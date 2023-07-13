import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './popup.css'

import { elementList } from '../Common/globalConstants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRocket,
  faFlask,
  faCircleInfo,
  faCircleQuestion,
  faBorderTopLeft,
} from '@fortawesome/free-solid-svg-icons'
import { PopupProps } from '../Common/propTypes'

import { Row, Col } from 'react-bootstrap'

export const AppPresentation = ({
  isMessageError,
  showCheckInput,
  isFileInput,
  showfileFormatError,
  isCheckboxClicked,
  isSelectOpen,
  comapctDensity,
  defaultDensity,
  customDensity,
  handleAlertClose,
  handleShowFileFormatClose,
  handleTraverseDom,
  handleCheckStyles,
  handleDownloadFile,
  handleCheckboxChange,
  handleFileInputChange,
  handleStylesSubmit,
  handleCheckDensity,
  isDensityFileInput,
  handleDensityFileInputChange,
  handleDensityCheckboxChange,
  handleDensitySubmit,
  openFormTab,
}: PopupProps): JSX.Element => {
  return (
    <div className="main-container">
      <div className="menu-icon">
        <a
          href="https://dom-traverser-extension.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            icon={faCircleQuestion}
            size="2xl"
            className="fa-bars"
            title="Info About the Extension"
          />
        </a>
      </div>
      <h1 className="popup-heading">DOM Traverser for Web</h1>
      <a
        href={elementList.USAGE_VIDEO_LINK}
        className="popup-video"
        target="_blank"
        title="know how to use this extension"
      >
        New here, watch a quick video
      </a>
      <p className="popup-quick">Quick Access</p>
      <hr className="popup-hr"></hr>
      {isMessageError && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <p className="alert-para">Please select an option to continue</p>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={handleAlertClose}
          ></button>
        </div>
      )}
      {showfileFormatError && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <p className="alert-para">Please upload a JSON file only</p>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={handleShowFileFormatClose}
          ></button>
        </div>
      )}
      <div className="popup-nav">
        <FontAwesomeIcon icon={faRocket} size="xl" className="fa-rocket" />
        <div>
          <a
            className="traverse-dom-menu-title"
            onClick={handleTraverseDom}
            title="Get Semantic HTML Errors"
          >
            Check Semantics
          </a>
          <p className="traverse-dom-menu">
            Travel the DOM of the website and Report HTML errors which violate
            <a
              href={elementList.SEMANTIC_STANDARDS_LINK}
              target="_blank"
              className="semantic-anchor-tag"
            >
              {'  '}
              semantic standards
            </a>
          </p>
        </div>
      </div>
      <hr className="popup-hr"></hr>
      <div className="check-styles-nav">
        <div className="check-styles-flex-div">
          <FontAwesomeIcon icon={faFlask} size="xl" className="fa-flask" />
          <div>
            <a
              className="traverse-dom-menu-title"
              onClick={handleCheckStyles}
              title="Check Styles of Elements"
            >
              Check Styles
            </a>
            <p className="traverse-dom-menu">
              Input a configuration file or use default styling standards to
              evaluate the style of the website
              <a onClick={handleDownloadFile} className="check-styles-anchor">
                {'  '}check sample config
              </a>
            </p>
          </div>
        </div>
        {showCheckInput && (
          <div>
            <label className="checkbox-label" htmlFor="checkbox">
              <input
                type="checkbox"
                name="deafult-check"
                id="checkbox"
                disabled={isFileInput}
                onChange={handleCheckboxChange}
                className="checkbox-input"
              />
              Keep default styles configuration
            </label>
            <div className="checkbox-or">
              <p className="checkbox-or-p">or</p>
            </div>
            <div className="input-file-div">
              <input
                type="file"
                id="configFile"
                name="configFile"
                className="file-input"
                disabled={isCheckboxClicked}
                onChange={handleFileInputChange}
              />
              <button
                type="submit"
                className="file-submit-button"
                onClick={handleStylesSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      <hr className="popup-hr"></hr>
      <div className="check-styles-nav">
        <div className="check-styles-flex-div">
          <FontAwesomeIcon
            icon={faBorderTopLeft}
            size="xl"
            className="fa-flask"
          />
          <div>
            <a
              className="traverse-dom-menu-title"
              onClick={handleCheckDensity}
              title="Check Styles of Elements"
            >
              Check Density
            </a>
            <p className="traverse-dom-menu">
              Validate density against pre-defined values for default or compact
              view of the page
              <a
                href={elementList.DENSITY_STANDARDS_LINK}
                target="_blank"
                className="check-styles-anchor"
              >
                {'  '}view the standards
              </a>
            </p>
          </div>
        </div>
        {isSelectOpen && (
          <div className="check-density">
            <div className="check-density-div">
              <label
                className="checkbox-label"
                htmlFor="default-density-checkbox"
              >
                <input
                  type="checkbox"
                  name="default-density-checkbox"
                  id="default-density-checkbox"
                  disabled={
                    comapctDensity || isDensityFileInput || customDensity
                  }
                  onChange={handleDensityCheckboxChange}
                  className="checkbox-input"
                />
                Spacious View
              </label>
              <label
                className="checkbox-label compact-checkbox-label"
                htmlFor="compact-density-checkbox"
              >
                <input
                  type="checkbox"
                  name="compact-density-checkbox"
                  id="compact-density-checkbox"
                  disabled={
                    defaultDensity || isDensityFileInput || customDensity
                  }
                  onChange={handleDensityCheckboxChange}
                  className="checkbox-input"
                />
                Compact View
              </label>
              <label
                className="checkbox-label custom-checkbox-label"
                htmlFor="custom-density-checkbox"
              >
                <input
                  type="checkbox"
                  name="custom-density-checkbox"
                  id="custom-density-checkbox"
                  disabled={defaultDensity || comapctDensity}
                  onChange={handleDensityCheckboxChange}
                  className="checkbox-input"
                />
                Custom Density
              </label>
            </div>
            <Row className="custom-density-row">
              <Col lg={6} md={6} sm={6} xs={6}>
                {customDensity && (
                  <div className="input-file-div">
                    <input
                      type="file"
                      id="densityConfigFile"
                      name="desnity-config-file"
                      className="file-input"
                      disabled={comapctDensity || defaultDensity}
                      onChange={handleDensityFileInputChange}
                    />
                  </div>
                )}
              </Col>
              <Col
                lg={6}
                md={6}
                sm={6}
                xs={6}
                className="density-button-column"
              >
                <button
                  type="submit"
                  className="density-submit-button"
                  onClick={handleDensitySubmit}
                >
                  Submit
                </button>
              </Col>
            </Row>
          </div>
        )}
      </div>
      <hr className="popup-hr"></hr>
      <div className="popup-footer">
        <span className="popup-version">
          version 0.0.2 |
          <a
            onClick={openFormTab}
            className="popup-issues"
            title="Report an issue"
          >
            {' '}
            Report an Issue{' '}
            <FontAwesomeIcon icon={faCircleInfo} className="fa-circle-info" />
          </a>
        </span>
      </div>
    </div>
  )
}
