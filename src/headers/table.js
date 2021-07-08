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
    nameSortOrder: 'asc',
    filenameSortOrder: null,
    sizeSortOrder: null,
    locationSortOrder: null,
    modifiedSortOrder: null,
  }

  changeOrder(propName) {
    const statePropName = propName + 'SortOrder'
    const newState = {}

    if (this.state[statePropName] === 'asc') {
      newState[statePropName] = 'desc'
      this.setState(newState)
    } else {
      newState[statePropName] = 'asc'
      this.setState(newState)
    }
  }

  getOrderIcon(orderPropName) {
    if (this.state[orderPropName] === 'desc') {
      return this.props.browserProps.icons.DescOrder
    } else {
      return this.props.browserProps.icons.AscOrder
    }
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
            this.changeOrder('name')
            this.props.handleChangeSort('name', this.state.nameSortOrder)
          }}>
            Name
          <span>{this.getOrderIcon('nameSortOrder')}</span>
          </span>
        </th>
        <th className="filename">
          <span onClick={(event) => {
            this.changeOrder('filename')
            this.props.handleChangeSort('filename', this.state.filenameSortOrder)
          }}>
            Filename
            <span>{this.getOrderIcon('filenameSortOrder')}</span>
          </span>
        </th>
        <th className="size">
          <span onClick={(event) => {
            this.changeOrder('size')
            this.props.handleChangeSort('size', this.state.sizeSortOrder)
          }}>
            Size
            <span>{this.getOrderIcon('sizeSortOrder')}</span>
          </span>
        </th>
        <th className="location">
          <span onClick={(event) => {
            this.changeOrder('location')
            this.props.handleChangeSort('location', this.state.locationSortOrder)
          }}>
            Location
            <span>{this.getOrderIcon('locationSortOrder')}</span>
          </span>
        </th>
        <th className="modified">
          <span onClick={(event) => {
            this.changeOrder('modified')
            this.props.handleChangeSort('modified', this.state.modifiedSortOrder)
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
