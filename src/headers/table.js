import PropTypes from 'prop-types'
import React from 'react'
import ClassNames from 'classnames'

import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import { BaseFileConnectors } from './../base-file.js'

class RawTableHeader extends React.Component {
  static propTypes = {
    select: PropTypes.func,
    fileKey: PropTypes.string,

    connectDropTarget: PropTypes.func,
    isOver: PropTypes.bool,
    isSelected: PropTypes.func,

    browserProps: PropTypes.shape({
      createFiles: PropTypes.func,
      moveFolder: PropTypes.func,
      moveFile: PropTypes.func,
      icons: PropTypes.shape({
        AscOrder: PropTypes.element,
        DescOrder: PropTypes.element,
      }),
  
    }),
  }

  handleHeaderClick(event) {
    this.props.select(this.props.fileKey)
  }

  render() {
    const header = (
      <tr
        className={ClassNames('folder', {
          dragover: this.props.isOver,
          selected: this.props.isSelected,
        })}
      >
        <th>File</th>
        <th className="size">Size</th>
        <th className="modified">Last Modified</th>
      </tr>
    )

    if (
      typeof this.props.browserProps.createFiles === 'function' ||
      typeof this.props.browserProps.moveFile === 'function' ||
      typeof this.props.browserProps.moveFolder === 'function'
    ) {
      return this.props.connectDropTarget(header)
    } else {
      return header
    }
  }
}

const TableHeader = DropTarget(
  ['file', 'folder', NativeTypes.FILE], 
  BaseFileConnectors.targetSource, 
  BaseFileConnectors.targetCollect
)(RawTableHeader)

class RawExtendedTableHeader extends RawTableHeader {
  state = {
    nameSortOrder: null,
    filenameSortOrder: null,
    sizeSortOrder: null,
    locationSortOrder: null,
    modifiedSortOrder: null,
  }

  getNewOrderState(propName) {
    const statePropName = propName + 'SortOrder'
    const newState = {
      nameSortOrder: null,
      filenameSortOrder: null,
      sizeSortOrder: null,
      modifiedSortOrder: null,
      locationSortOrder: null,
    }
    if (this.state[statePropName] === 'desc') {
      newState[statePropName] = 'asc'
    } else {
      newState[statePropName] = 'desc'
    }

    return newState
  }

  getOrderIcon(orderPropName) {
    if (this.state[orderPropName] === 'desc') {
      return this.props.browserProps.icons.DescOrder
    } else if (this.state[orderPropName] === 'asc') {
      return this.props.browserProps.icons.AscOrder
    } else {
      return null
    }
  }

  handleHeaderClick(headerName) {
    const newState = this.getNewOrderState(headerName)
    this.props.handleChangeSort(headerName, newState[headerName + 'SortOrder'])
    this.setState(newState)
  }

  render() {
    const header = (
      <tr
        className={ClassNames('folder', {
          dragover: this.props.isOver,
          selected: this.props.isSelected,
        })}
      >
        <th className="name">
          <span onClick={(event) => {
            this.handleHeaderClick('name')
          }}>
            Name
          <span>{this.getOrderIcon('nameSortOrder')}</span>
          </span>
        </th>
        <th className="filename">
          <span onClick={(event) => {
            this.handleHeaderClick('filename')
          }}>
            Filename
            <span>{this.getOrderIcon('filenameSortOrder')}</span>
          </span>
        </th>
        <th className="size">
          <span onClick={(event) => {
            this.handleHeaderClick('size')
          }}>
            Size
            <span>{this.getOrderIcon('sizeSortOrder')}</span>
          </span>
        </th>
        <th className="location">
          <span onClick={(event) => {
            this.handleHeaderClick('location')
          }}>
            Location
            <span>{this.getOrderIcon('locationSortOrder')}</span>
          </span>
        </th>
        <th className="modified">
          <span onClick={(event) => {
            this.handleHeaderClick('modified')
          }}>
            Modified
            <span>{this.getOrderIcon('modifiedSortOrder')}</span>
          </span>
        </th>
        <th className="actions">Actions</th>
      </tr>
    )

    if (
      typeof this.props.browserProps.createFiles === 'function' ||
      typeof this.props.browserProps.moveFile === 'function' ||
      typeof this.props.browserProps.moveFolder === 'function'
    ) {
      return this.props.connectDropTarget(header)
    } else {
      return header
    }
  }
}

const ExtendedTableHeader = DropTarget(
  ['file', 'folder', NativeTypes.FILE], 
  BaseFileConnectors.targetSource, 
  BaseFileConnectors.targetCollect
)(RawExtendedTableHeader)

export default TableHeader
export { RawTableHeader, ExtendedTableHeader }
