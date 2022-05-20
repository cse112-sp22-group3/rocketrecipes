# Firebase Data Model

- Firebase persists data as JSON. We can think of the data in our domain as a collection of users keyed by an accountId, where each user has a name, recipeCount, collection of recipes, and collection of favorited recipes (where each recipe is keyed by a recipeId).

- This example model consists of 2 users "Br6v40acvTTGoMvvdbLLRBPplHF3" and "Br6v40acvTTGoMvvdbLLRBPplLF5" which each have two recipes, one favorited recipe of eachother, and each a published recipe in the "publishedRecipes" collection. 

- We also have a collection called "publishedRecipes" which will contain identical recipe data of a user recipe (if a user marks that recipe as shared upon creation).

- User accountId's are constructed automatically by firebase, they will be a 28 character string.

- Each user's recipeId is constructed using the accountId, and the user's total recipe creation count prior to insertion. The intuition behind this is we want recipeIds to be unique, so this 'total recipe' count can ONLY increment and thus if a recipe is created by a user with 98 recipes prior to insertion, this new recipe will have id of: [userid]-98. And we're guaranteed no other recipe will have this same id, because we increment total recipe count after insertion to firebase, and this value will never be 98 again. 


- NOTE: This is not a permanent structure of our data (i.e. may ommit or add additional fields), but we SHOULD all be on the same page as to the general structure and the basic data that's relevant.

```json
{
  "publishedRecipes": {
    "Br6v40acvTTGoMvvdbLLRBPplHF3-98": {
      "public": true,
      "@context": "https://schema.org",
      "@type": "Recipe",
      "author": "Jake  Smith",
      "cookTime": "PT2H",
      "datePublished": "2015-05-18",
      "description": "Your recipe description goes here",
      "image": "http://www.example.com/images.jpg",
      "recipeIngredient": {
        "ingredient 1": "banana",
        "ingredient 2": "bread crumbs",
        "ingredient 3": "pudding",
        "ingredient 4": "brown sugar",
        "ingredient 5": "flour"
      },
      "name": "Rand's Cookies",
      "nutrition": {
        "@type": "NutritionInformation",
        "calories": "1200 calories",
        "carbohydrateContent": "12 carbs",
        "proteinContent": "9 grams of protein",
        "fatContent": "9 grams fat"
      },
      "prepTime": "PT15M",
      "recipeInstructions": "This is the long part, etc.",
      "recipeYield": "12 cookies"
    },
    "Br6v40acvTTGoMvvdbLLRBPplLF5-68": {
      "public": true,
      "@context": "https://schema.org",
      "@type": "Recipe",
      "author": "Jake  Smith",
      "cookTime": "PT2H",
      "datePublished": "2015-05-18",
      "description": "Your recipe description goes here",
      "image": "http://www.example.com/images.jpg",
      "recipeIngredient": {
        "ingredient 1": "banana",
        "ingredient 2": "bread crumbs",
        "ingredient 3": "pudding",
        "ingredient 4": "brown sugar",
        "ingredient 5": "flour"
      },
      "name": "Rand's Cookies",
      "nutrition": {
        "@type": "NutritionInformation",
        "calories": "1200 calories",
        "carbohydrateContent": "12 carbs",
        "proteinContent": "9 grams of protein",
        "fatContent": "9 grams fat"
      },
      "prepTime": "PT15M",
      "recipeInstructions": "This is the long part, etc.",
      "recipeYield": "12 cookies"
    }
  },
  "Br6v40acvTTGoMvvdbLLRBPplHF3": {
    "name": "Jeff Huevos",
    "recipeCount": "99",
    "recipes": {
      "Br6v40acvTTGoMvvdbLLRBPplHF3-97": {
        "public": false,
        "@context": "https://schema.org",
        "@type": "Recipe",
        "author": "Jake  Smith",
        "cookTime": "PT2H",
        "datePublished": "2015-05-18",
        "description": "Your recipe description goes here",
        "image": "http://www.example.com/images.jpg",
        "recipeIngredient": {
          "ingredient 1": "banana",
          "ingredient 2": "bread crumbs",
          "ingredient 3": "pudding",
          "ingredient 4": "brown sugar",
          "ingredient 5": "flour"
        },
        "name": "Rand's Cookies",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "1200 calories",
          "carbohydrateContent": "12 carbs",
          "proteinContent": "9 grams of protein",
          "fatContent": "9 grams fat"
        },
        "prepTime": "PT15M",
        "recipeInstructions": "This is the long part, etc.",
        "recipeYield": "12 cookies"
      },
      "Br6v40acvTTGoMvvdbLLRBPplHF3-98": {
        "public": true,
        "@context": "https://schema.org",
        "@type": "Recipe",
        "author": "Jake  Smith",
        "cookTime": "PT2H",
        "datePublished": "2015-05-18",
        "description": "Your recipe description goes here",
        "image": "http://www.example.com/images.jpg",
        "recipeIngredient": {
          "ingredient 1": "banana",
          "ingredient 2": "bread crumbs",
          "ingredient 3": "pudding",
          "ingredient 4": "brown sugar",
          "ingredient 5": "flour"
        },
        "name": "Rand's Cookies",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "1200 calories",
          "carbohydrateContent": "12 carbs",
          "proteinContent": "9 grams of protein",
          "fatContent": "9 grams fat"
        },
        "prepTime": "PT15M",
        "recipeInstructions": "This is the long part, etc.",
        "recipeYield": "12 cookies"
      }
    },
    "favorites": {
      "Br6v40acvTTGoMvvdbLLRBPplLF5-68": {
        "public": true,
        "@context": "https://schema.org",
        "@type": "Recipe",
        "author": "Jake  Smith",
        "cookTime": "PT2H",
        "datePublished": "2015-05-18",
        "description": "Your recipe description goes here",
        "image": "http://www.example.com/images.jpg",
        "recipeIngredient": {
          "ingredient 1": "banana",
          "ingredient 2": "bread crumbs",
          "ingredient 3": "pudding",
          "ingredient 4": "brown sugar",
          "ingredient 5": "flour"
        },
        "name": "Rand's Cookies",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "1200 calories",
          "carbohydrateContent": "12 carbs",
          "proteinContent": "9 grams of protein",
          "fatContent": "9 grams fat"
        },
        "prepTime": "PT15M",
        "recipeInstructions": "This is the long part, etc.",
        "recipeYield": "12 cookies"
      }
    }
  },
  "Br6v40acvTTGoMvvdbLLRBPplLF5": {
    "name": "Jeff Nuevos",
    "recipeCount": "70",
    "recipes": {
      "Br6v40acvTTGoMvvdbLLRBPplLF5-67": {
        "public": true,
        "@context": "https://schema.org",
        "@type": "Recipe",
        "author": "Jake  Smith",
        "cookTime": "PT2H",
        "datePublished": "2015-05-18",
        "description": "Your recipe description goes here",
        "image": "http://www.example.com/images.jpg",
        "recipeIngredient": {
          "ingredient 1": "banana",
          "ingredient 2": "bread crumbs",
          "ingredient 3": "pudding",
          "ingredient 4": "brown sugar",
          "ingredient 5": "flour"
        },
        "name": "Rand's Cookies",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "1200 calories",
          "carbohydrateContent": "12 carbs",
          "proteinContent": "9 grams of protein",
          "fatContent": "9 grams fat"
        },
        "prepTime": "PT15M",
        "recipeInstructions": "This is the long part, etc.",
        "recipeYield": "12 cookies"
      },
      "Br6v40acvTTGoMvvdbLLRBPplLF5-68": {
        "public": true,
        "@context": "https://schema.org",
        "@type": "Recipe",
        "author": "Jake  Smith",
        "cookTime": "PT2H",
        "datePublished": "2015-05-18",
        "description": "Your recipe description goes here",
        "image": "http://www.example.com/images.jpg",
        "recipeIngredient": {
          "ingredient 1": "banana",
          "ingredient 2": "bread crumbs",
          "ingredient 3": "pudding",
          "ingredient 4": "brown sugar",
          "ingredient 5": "flour"
        },
        "name": "Rand's Cookies",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "1200 calories",
          "carbohydrateContent": "12 carbs",
          "proteinContent": "9 grams of protein",
          "fatContent": "9 grams fat"
        },
        "prepTime": "PT15M",
        "recipeInstructions": "This is the long part, etc.",
        "recipeYield": "12 cookies"
      }
    },
    "favorites": {
      "Br6v40acvTTGoMvvdbLLRBPplHF3-98": {
        "public": true,
        "@context": "https://schema.org",
        "@type": "Recipe",
        "author": "Jake  Smith",
        "cookTime": "PT2H",
        "datePublished": "2015-05-18",
        "description": "Your recipe description goes here",
        "image": "http://www.example.com/images.jpg",
        "recipeIngredient": {
          "ingredient 1": "banana",
          "ingredient 2": "bread crumbs",
          "ingredient 3": "pudding",
          "ingredient 4": "brown sugar",
          "ingredient 5": "flour"
        },
        "name": "Rand's Cookies",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "1200 calories",
          "carbohydrateContent": "12 carbs",
          "proteinContent": "9 grams of protein",
          "fatContent": "9 grams fat"
        },
        "prepTime": "PT15M",
        "recipeInstructions": "This is the long part, etc.",
        "recipeYield": "12 cookies"
      }
    }
  }
}
```
##  Alternative Data Model

-  An equivalent but alternative Data Model, in collaboration between @gmihir and @lramos10. This data model conains the exact same data, just separates user related data and recipe data into two endpoints:
 `[base_url]/recipes/{userId}/...` and `[base_url]/users/{userId}/...`.

 - RecipeIds assumed to be generated the same way as the last data model.

```json
{
  "users": {
    "Br6v40acvTTGoMvvdbLLRBPplHF3": {
      "name": "Jeff Huevos",
      "recipeCount": "99"
    },
    "Br6v40acvTTGoMvvdbLLRBPplLF5": {
      "name": "Jeff Nuevos",
      "recipeCount": "70"
    }
  },
  "recipes": {
    "publishedRecipes": {
      "Br6v40acvTTGoMvvdbLLRBPplHF3-98": {
        "public": true,
        "@context": "https://schema.org",
        "@type": "Recipe",
        "author": "Jake  Smith",
        "cookTime": "PT2H",
        "datePublished": "2015-05-18",
        "description": "Your recipe description goes here",
        "image": "http://www.example.com/images.jpg",
        "recipeIngredient": {
          "ingredient 1": "banana",
          "ingredient 2": "bread crumbs",
          "ingredient 3": "pudding",
          "ingredient 4": "brown sugar",
          "ingredient 5": "flour"
        },
        "name": "Rand's Cookies",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "1200 calories",
          "carbohydrateContent": "12 carbs",
          "proteinContent": "9 grams of protein",
          "fatContent": "9 grams fat"
        },
        "prepTime": "PT15M",
        "recipeInstructions": "This is the long part, etc.",
        "recipeYield": "12 cookies"
      },
      "Br6v40acvTTGoMvvdbLLRBPplLF5-68": {
        "public": true,
        "@context": "https://schema.org",
        "@type": "Recipe",
        "author": "Jake  Smith",
        "cookTime": "PT2H",
        "datePublished": "2015-05-18",
        "description": "Your recipe description goes here",
        "image": "http://www.example.com/images.jpg",
        "recipeIngredient": {
          "ingredient 1": "banana",
          "ingredient 2": "bread crumbs",
          "ingredient 3": "pudding",
          "ingredient 4": "brown sugar",
          "ingredient 5": "flour"
        },
        "name": "Rand's Cookies",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "1200 calories",
          "carbohydrateContent": "12 carbs",
          "proteinContent": "9 grams of protein",
          "fatContent": "9 grams fat"
        },
        "prepTime": "PT15M",
        "recipeInstructions": "This is the long part, etc.",
        "recipeYield": "12 cookies"
      },
      "Br6v40acvTTGoMvvdbLLRBPplHF3": {
        "recipes": {
          "Br6v40acvTTGoMvvdbLLRBPplHF3-97": {
            "public": false,
            "@context": "https://schema.org",
            "@type": "Recipe",
            "author": "Jake  Smith",
            "cookTime": "PT2H",
            "datePublished": "2015-05-18",
            "description": "Your recipe description goes here",
            "image": "http://www.example.com/images.jpg",
            "recipeIngredient": {
              "ingredient 1": "banana",
              "ingredient 2": "bread crumbs",
              "ingredient 3": "pudding",
              "ingredient 4": "brown sugar",
              "ingredient 5": "flour"
            },
            "name": "Rand's Cookies",
            "nutrition": {
              "@type": "NutritionInformation",
              "calories": "1200 calories",
              "carbohydrateContent": "12 carbs",
              "proteinContent": "9 grams of protein",
              "fatContent": "9 grams fat"
            },
            "prepTime": "PT15M",
            "recipeInstructions": "This is the long part, etc.",
            "recipeYield": "12 cookies"
          },
          "Br6v40acvTTGoMvvdbLLRBPplHF3-98": {
            "public": true,
            "@context": "https://schema.org",
            "@type": "Recipe",
            "author": "Jake  Smith",
            "cookTime": "PT2H",
            "datePublished": "2015-05-18",
            "description": "Your recipe description goes here",
            "image": "http://www.example.com/images.jpg",
            "recipeIngredient": {
              "ingredient 1": "banana",
              "ingredient 2": "bread crumbs",
              "ingredient 3": "pudding",
              "ingredient 4": "brown sugar",
              "ingredient 5": "flour"
            },
            "name": "Rand's Cookies",
            "nutrition": {
              "@type": "NutritionInformation",
              "calories": "1200 calories",
              "carbohydrateContent": "12 carbs",
              "proteinContent": "9 grams of protein",
              "fatContent": "9 grams fat"
            },
            "prepTime": "PT15M",
            "recipeInstructions": "This is the long part, etc.",
            "recipeYield": "12 cookies"
          }
        },
        "favorites": {
          "Br6v40acvTTGoMvvdbLLRBPplLF5-68": {
            "public": true,
            "@context": "https://schema.org",
            "@type": "Recipe",
            "author": "Jake  Smith",
            "cookTime": "PT2H",
            "datePublished": "2015-05-18",
            "description": "Your recipe description goes here",
            "image": "http://www.example.com/images.jpg",
            "recipeIngredient": {
              "ingredient 1": "banana",
              "ingredient 2": "bread crumbs",
              "ingredient 3": "pudding",
              "ingredient 4": "brown sugar",
              "ingredient 5": "flour"
            },
            "name": "Rand's Cookies",
            "nutrition": {
              "@type": "NutritionInformation",
              "calories": "1200 calories",
              "carbohydrateContent": "12 carbs",
              "proteinContent": "9 grams of protein",
              "fatContent": "9 grams fat"
            },
            "prepTime": "PT15M",
            "recipeInstructions": "This is the long part, etc.",
            "recipeYield": "12 cookies"
          }
        }
      },
      "Br6v40acvTTGoMvvdbLLRBPplHF5": {
        "private": {
          "Br6v40acvTTGoMvvdbLLRBPplLF5-67": {
            "public": true,
            "@context": "https://schema.org",
            "@type": "Recipe",
            "author": "Jake  Smith",
            "cookTime": "PT2H",
            "datePublished": "2015-05-18",
            "description": "Your recipe description goes here",
            "image": "http://www.example.com/images.jpg",
            "recipeIngredient": {
              "ingredient 1": "banana",
              "ingredient 2": "bread crumbs",
              "ingredient 3": "pudding",
              "ingredient 4": "brown sugar",
              "ingredient 5": "flour"
            },
            "name": "Rand's Cookies",
            "nutrition": {
              "@type": "NutritionInformation",
              "calories": "1200 calories",
              "carbohydrateContent": "12 carbs",
              "proteinContent": "9 grams of protein",
              "fatContent": "9 grams fat"
            },
            "prepTime": "PT15M",
            "recipeInstructions": "This is the long part, etc.",
            "recipeYield": "12 cookies"
          },
          "Br6v40acvTTGoMvvdbLLRBPplLF5-68": {
            "public": true,
            "@context": "https://schema.org",
            "@type": "Recipe",
            "author": "Jake  Smith",
            "cookTime": "PT2H",
            "datePublished": "2015-05-18",
            "description": "Your recipe description goes here",
            "image": "http://www.example.com/images.jpg",
            "recipeIngredient": {
              "ingredient 1": "banana",
              "ingredient 2": "bread crumbs",
              "ingredient 3": "pudding",
              "ingredient 4": "brown sugar",
              "ingredient 5": "flour"
            },
            "name": "Rand's Cookies",
            "nutrition": {
              "@type": "NutritionInformation",
              "calories": "1200 calories",
              "carbohydrateContent": "12 carbs",
              "proteinContent": "9 grams of protein",
              "fatContent": "9 grams fat"
            },
            "prepTime": "PT15M",
            "recipeInstructions": "This is the long part, etc.",
            "recipeYield": "12 cookies"
          }
        },
        "favorites": {
          "Br6v40acvTTGoMvvdbLLRBPplHF3-98": {
            "public": true,
            "@context": "https://schema.org",
            "@type": "Recipe",
            "author": "Jake  Smith",
            "cookTime": "PT2H",
            "datePublished": "2015-05-18",
            "description": "Your recipe description goes here",
            "image": "http://www.example.com/images.jpg",
            "recipeIngredient": {
              "ingredient 1": "banana",
              "ingredient 2": "bread crumbs",
              "ingredient 3": "pudding",
              "ingredient 4": "brown sugar",
              "ingredient 5": "flour"
            },
            "name": "Rand's Cookies",
            "nutrition": {
              "@type": "NutritionInformation",
              "calories": "1200 calories",
              "carbohydrateContent": "12 carbs",
              "proteinContent": "9 grams of protein",
              "fatContent": "9 grams fat"
            },
            "prepTime": "PT15M",
            "recipeInstructions": "This is the long part, etc.",
            "recipeYield": "12 cookies"
          }
        }
      }
    }
  }
}
```