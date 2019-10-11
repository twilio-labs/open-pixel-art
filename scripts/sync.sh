# TODO turn this dynamic
$OLD_BRANCH=add-merge-driver

# Add remote
# TODO make sure to check if it already exists
git remote add twilio-labs https://github.com/twilio-labs/open-pixel-art.git
git checkout master
git pull twilio-labs master
git push origin master
git checkout $OLD_BRANCH
git merge master