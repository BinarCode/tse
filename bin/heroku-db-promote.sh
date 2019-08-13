hpromote() {
    #Promote database on heroku
    echo Hello, what is the number of the PR?
    read number
    echo What is the main app name?
    read app
    echo Here is the current config for the PR-#$number?
    heroku config -a $app-pr-$number
    echo Database color you want to promote as main ?
    echo ""
    read color
    heroku pg:promote --app=$app-pr-$number HEROKU_POSTGRESQL_$color_URL
    heroku config -a $app-pr-$number
    echo "Do you want to refresh (remigrate, reseed) the database? (y/n)"
    read refresh
    if [[ "$refresh" == "y" ]]; then
        echo Just a second, we will refresh the database
        heroku run scripts/build.sh -a $app-pr-$number
    fi

}
hpromote
