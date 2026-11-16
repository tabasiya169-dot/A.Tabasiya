class RecipeBook:

    def setInstructions(self):
        self.recipe_name = input("Enter the recipe name: ")
        self.no_of_ingredients = int(input("Enter the number of ingredients: "))
        self.ingredients = input("Enter the ingredients: ")
        self.hours_taken = input("Enter the hours taken: ")
        self.no_of_servings = int(input("Enter the number of servings: "))
        self.cooking_method = input("Enter the cooking method: ")

    def getInstructions(self):
        print("Recipe Name:", self.recipe_name)
        print("Number of Ingredients:", self.no_of_ingredients)
        print("Ingredients:", self.ingredients)
        print("Hours Taken:", self.hours_taken)
        print("Number of Servings:", self.no_of_servings)
        print("Cooking Method:", self.cooking_method)


biryani = RecipeBook()

biryani.setInstructions()
biryani.getInstructions()
