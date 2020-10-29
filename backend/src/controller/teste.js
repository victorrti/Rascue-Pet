const express = require('express');
const crypto = require('crypto');
const connection = require('../database/connection');
const path = require('path');
const fs = require('fs')

async function teste(){
    const id = 'd8ed6e2199b6'
    const petinfo = await connection('pets').where('id',id).select('*');
    console.log(petinfo[0].value)
}
teste();

