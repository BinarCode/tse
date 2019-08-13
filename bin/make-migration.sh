#!/bin/bash
# This is script will make a migration for a new entity
# Usage: yarn db:make-migration users
make-migration() {
    echo "Plural of the entity name:"
    read entity
    mkdir "src/components/$entity"
    npx sequelize-cli model:generate --name $entity --attributes test:string --models-path "src/components/$entity"
    rm "src/components/$entity/$entity.js"
}

make-migration

