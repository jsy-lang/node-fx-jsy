'use strict'

const jsy_transpile = require('jsy-transpile')
const fx = require('fx/fx.js')


function jsy_reducer(json, jsy_code, index) {
  if ('?' === jsy_code) return Object.keys(json)
  if ('.' === jsy_code) return json

  const code = jsy_transpile(jsy_code.trim())

  let fn

  if (/\byield\b/.test(code))
    fn = as_generator(code)

  else if (/^(?:\w+|\(\s*\))\s*=>/.test(jsy_code))
    fn = as_callable(code)

  else if (/^this/.test(code))
    fn = as_expression(code)

  else if (/^\.\[/.test(code))
    fn = as_expression('this' + code.slice(1))

  else if (/^\./.test(code))
    fn = as_expression('this' + code.replace(/^\.(\d+)/, '[$1]'))

  else fn = as_expression(code)

  return fn.call(json, json) }



function as_callable(code) {
  return eval(`(function() {
    return (${code})
      .call(this, this) })` ) }

function as_generator(code) {
  return eval(`(function() {
    return Array.from(
       (function*() {${code}})
       .call(this) )})`) }

function as_expression(code) {
  return eval(`(function() {
    return (${code}) })` ) }



module.exports = exports = Object.assign(jsy_reducer, {
  jsy_reducer,
  as_callable,
  as_generator,
  as_expression,
})

