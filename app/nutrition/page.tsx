import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavigationHeader } from "@/components/dear/navigation-header"
import { Clock, ChefHat, Target, TrendingUp, Plus, Heart, Zap, Leaf, ShoppingCart, Calendar } from "lucide-react"

export default function NutritionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 font-sans">Nutrition & Meal Planning</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            AI-powered personalized nutrition plans designed for your transformation goals
          </p>
        </div>

        {/* Daily Nutrition Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Target className="h-5 w-5 text-dear-primary" />
              Today's Nutrition Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-primary mb-1">1,847</div>
                <div className="text-sm text-slate-600 mb-2">Calories</div>
                <Progress value={75} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">75% of goal</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-accent mb-1">125g</div>
                <div className="text-sm text-slate-600 mb-2">Protein</div>
                <Progress value={85} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">85% of goal</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-success mb-1">180g</div>
                <div className="text-sm text-slate-600 mb-2">Carbs</div>
                <Progress value={60} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">60% of goal</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-dear-warning mb-1">65g</div>
                <div className="text-sm text-slate-600 mb-2">Fats</div>
                <Progress value={70} className="h-2" />
                <div className="text-xs text-slate-500 mt-1">70% of goal</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="meal-plan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          {/* Meal Plan Tab */}
          <TabsContent value="meal-plan" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Meals */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-dear-primary" />
                        Today's Meal Plan
                      </span>
                      <Button size="sm" className="bg-dear-primary hover:bg-dear-primary/90">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Meal
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        meal: "Breakfast",
                        time: "8:00 AM",
                        calories: 420,
                        items: ["Greek Yogurt Bowl", "Mixed Berries", "Granola"],
                      },
                      {
                        meal: "Lunch",
                        time: "12:30 PM",
                        calories: 580,
                        items: ["Grilled Chicken Salad", "Quinoa", "Avocado"],
                      },
                      { meal: "Snack", time: "3:30 PM", calories: 180, items: ["Apple", "Almond Butter"] },
                      {
                        meal: "Dinner",
                        time: "7:00 PM",
                        calories: 650,
                        items: ["Salmon", "Sweet Potato", "Steamed Broccoli"],
                      },
                    ].map((meal, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-800">{meal.meal}</h3>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {meal.time}
                            </Badge>
                            <Badge className="bg-dear-primary/10 text-dear-primary">{meal.calories} cal</Badge>
                          </div>
                          <div className="text-sm text-slate-600">{meal.items.join(" • ")}</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Overview */}
              <div>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                        <div key={day} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{day}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={Math.random() * 100} className="w-16 h-2" />
                            <span className="text-xs text-slate-600">{Math.floor(1800 + Math.random() * 400)} cal</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Shopping List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-dear-accent hover:bg-dear-accent/90 mb-4">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Generate List
                    </Button>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Greek Yogurt (2 cups)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Mixed Berries (1 lb)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Chicken Breast (2 lbs)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span>Quinoa (1 bag)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Recipes Tab */}
          <TabsContent value="recipes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Mediterranean Bowl",
                  time: "15 min",
                  calories: 420,
                  difficulty: "Easy",
                  tags: ["High Protein", "Gluten-Free"],
                },
                {
                  name: "Grilled Salmon",
                  time: "25 min",
                  calories: 380,
                  difficulty: "Medium",
                  tags: ["Omega-3", "Low Carb"],
                },
                {
                  name: "Quinoa Power Salad",
                  time: "10 min",
                  calories: 350,
                  difficulty: "Easy",
                  tags: ["Vegan", "High Fiber"],
                },
                {
                  name: "Chicken Stir Fry",
                  time: "20 min",
                  calories: 450,
                  difficulty: "Easy",
                  tags: ["High Protein", "Vegetables"],
                },
                {
                  name: "Avocado Toast Plus",
                  time: "8 min",
                  calories: 320,
                  difficulty: "Easy",
                  tags: ["Healthy Fats", "Quick"],
                },
                {
                  name: "Berry Smoothie Bowl",
                  time: "5 min",
                  calories: 280,
                  difficulty: "Easy",
                  tags: ["Antioxidants", "Breakfast"],
                },
              ].map((recipe, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="w-full h-32 bg-gradient-to-br from-dear-primary/20 to-dear-accent/20 rounded-lg mb-3 flex items-center justify-center">
                      <ChefHat className="h-8 w-8 text-dear-primary" />
                    </div>
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {recipe.time}
                      </span>
                      <span>{recipe.calories} cal</span>
                      <Badge variant="outline" className="text-xs">
                        {recipe.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {recipe.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} className="text-xs bg-dear-success/10 text-dear-success">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-dear-primary hover:bg-dear-primary/90">View Recipe</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Food Log</CardTitle>
                  <CardDescription>Track your meals and snacks</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-4 bg-dear-primary hover:bg-dear-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Log Food
                  </Button>
                  <div className="space-y-3">
                    {[
                      { food: "Greek Yogurt with Berries", time: "8:15 AM", calories: 180 },
                      { food: "Green Smoothie", time: "10:30 AM", calories: 120 },
                      { food: "Chicken Caesar Salad", time: "12:45 PM", calories: 420 },
                    ].map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-medium text-slate-800">{entry.food}</div>
                          <div className="text-sm text-slate-600">{entry.time}</div>
                        </div>
                        <Badge className="bg-dear-primary/10 text-dear-primary">{entry.calories} cal</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Nutrition Trends</CardTitle>
                  <CardDescription>Your progress over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-dear-success/10 to-dear-success/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Weekly Average</span>
                        <TrendingUp className="h-4 w-4 text-dear-success" />
                      </div>
                      <div className="text-2xl font-bold text-dear-success">1,892 cal/day</div>
                      <div className="text-sm text-slate-600">+5% from last week</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Protein Goal</span>
                        <span className="text-sm font-medium">87% avg</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Hydration</span>
                        <span className="text-sm font-medium">92% avg</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Meal Timing</span>
                        <span className="text-sm font-medium">Excellent</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-dear-warning" />
                    AI Nutrition Coach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-dear-primary/10 to-dear-primary/5 rounded-lg">
                      <h3 className="font-semibold text-dear-primary mb-2">Today's Recommendation</h3>
                      <p className="text-sm text-slate-700">
                        Your protein intake is excellent! Consider adding more leafy greens to boost your micronutrient
                        profile for optimal recovery.
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-dear-accent/10 to-dear-accent/5 rounded-lg">
                      <h3 className="font-semibold text-dear-accent mb-2">Meal Timing Insight</h3>
                      <p className="text-sm text-slate-700">
                        Your post-workout nutrition window is perfectly timed. This supports your muscle building goals
                        effectively.
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-dear-success/10 to-dear-success/5 rounded-lg">
                      <h3 className="font-semibold text-dear-success mb-2">Progress Update</h3>
                      <p className="text-sm text-slate-700">
                        Your consistent nutrition habits are showing great results. Keep up the balanced approach!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-dear-success" />
                    Personalized Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        title: "Increase Omega-3",
                        description: "Add salmon or walnuts twice this week",
                        priority: "High",
                      },
                      {
                        title: "Hydration Boost",
                        description: "Aim for 2 more glasses of water daily",
                        priority: "Medium",
                      },
                      { title: "Fiber Focus", description: "Include more beans and lentils", priority: "Medium" },
                      { title: "Meal Prep Sunday", description: "Prepare 3 meals in advance", priority: "Low" },
                    ].map((suggestion, index) => (
                      <div key={index} className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">{suggestion.title}</h4>
                          <p className="text-sm text-slate-600">{suggestion.description}</p>
                        </div>
                        <Badge
                          variant={suggestion.priority === "High" ? "default" : "outline"}
                          className={suggestion.priority === "High" ? "bg-dear-warning text-white" : ""}
                        >
                          {suggestion.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
