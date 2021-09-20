// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from 'rescript/lib/es6/curry.js'
import * as React from 'react'
import * as StylesModuleCss from './styles.module.css'
import StarRating from '../../components/StarRating'

var styles = StylesModuleCss

var make = StarRating

var StarRating$1 = {
  make: make,
}

function CoffeeAddForm(Props) {
  var match = React.useState(function() {
    return ''
  })
  var setName = match[1]
  var name = match[0]
  var match$1 = React.useState(function() {
    return ''
  })
  var setLocation = match$1[1]
  var $$location = match$1[0]
  var match$2 = React.useState(function() {
    return ''
  })
  var setAuthorization = match$2[1]
  var match$3 = React.useState(function() {
    return 0
  })
  var setRating = match$3[1]
  var rating = match$3[0]
  var match$4 = React.useState(function() {
    return false
  })
  var setTriggerDeploy = match$4[1]
  var onChange = function(evt, updater) {
    evt.preventDefault()
    var value = evt.target.value
    return Curry._1(updater, function(_prev) {
      return value
    })
  }
  var onChangeDeploy = function(param) {
    return Curry._1(setTriggerDeploy, function(_prev) {
      return !_prev
    })
  }
  var onSubmit = function(param) {
    var r = String(rating)
    console.log(name + ' ' + $$location + ' ' + r)
  }
  return React.createElement(
    'div',
    {
      className: styles.root,
    },
    React.createElement('input', {
      name: 'name',
      placeholder: 'Name',
      value: name,
      onChange: function(e) {
        return onChange(e, setName)
      },
    }),
    React.createElement('input', {
      name: 'location',
      placeholder: 'Location',
      value: $$location,
      onChange: function(e) {
        return onChange(e, setLocation)
      },
    }),
    React.createElement('input', {
      name: 'rating',
      placeholder: 'Rating',
      type: 'number',
      value: String(rating),
      onChange: function(e) {
        return onChange(e, setRating)
      },
    }),
    React.createElement(
      'div',
      undefined,
      React.createElement(make, {
        rating: rating,
      })
    ),
    React.createElement('input', {
      name: 'authorization',
      placeholder: 'Authorization',
      value: match$2[0],
      onChange: function(e) {
        return onChange(e, setAuthorization)
      },
    }),
    React.createElement(
      'div',
      undefined,
      React.createElement('input', {
        className: styles.checkbox,
        type: 'checkbox',
        onChange: onChangeDeploy,
      }),
      'Should trigger deploy'
    ),
    React.createElement(
      'button',
      {
        className: styles.submitButton,
        onClick: onSubmit,
      },
      'Submit'
    )
  )
}

var make$1 = CoffeeAddForm

export { styles, StarRating$1 as StarRating, make$1 as make }
/* styles Not a pure module */
