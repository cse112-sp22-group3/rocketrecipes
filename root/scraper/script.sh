#!/bin/bash
a=0
while true
do
	node scraper.js $a
	sleep 0.1
	((a=a+1))
	echo $a
	if [ $a -eq 100 ]
	then
		((a=0))
		curl "https://api.spoonacular.com/recipes/complexSearch?apiKey=f5bb0a9de72f43e9993b776534f13957&sort=random&addRecipeInformation=true&number=100&fillIngredients=true" -o "scraper-util-recipe.json"
		echo "resetting a"
	fi
done