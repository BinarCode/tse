#!/bin/bash
# This is script is meant to be run in Heroku after every PR. It does the following:
# 1. Check env
# 2. Run migrate if production environment & run refresh db if staging

function refresh_and_reseed_all_database {
    echo "> db:migrate:undo:all"
    sequelize db:migrate:undo:all --url=$DATABASE_URL
    echo "> db:migrate"
    sequelize db:migrate --url=$DATABASE_URL
    echo "> db:seed"
    sequelize db:seed:all --url=$DATABASE_URL
    echo "> Successfully prepared staging DB"
}


function prepare_development_database {
    echo "> Prepare development DB"
    refresh_and_reseed_all_database
}

function prepare_staging_database {
    echo "> Prepare staging DB"
    refresh_and_reseed_all_database
}

function prepare_production_database {
    echo "> Prepare DB migration for production"
    echo "> db:migrate"
    sequelize db:migrate --url=$DATABASE_URL
    echo "> Successfully migrated production DB"
}

function run_build {
   echo $NODE_ENV
   npm run build-ts

  if [[ "$NODE_ENV" == "staging" ]]; then
    prepare_staging_database
  elif [[ "$NODE_ENV" == "production" ]]; then
    prepare_production_database
  elif [[ "$NODE_ENV" == "development" ]]; then
    prepare_development_database
  fi

  cp -R views ./dist/
  cp -R storage/ dist

  echo "> Done."
}

run_build
