// Create User nodes with properties
CREATE CONSTRAINT user_id_unique IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE;

// Create Interest nodes
CREATE CONSTRAINT interest_name_unique IF NOT EXISTS FOR (i:Interest) REQUIRE i.name IS UNIQUE;

// Create Group nodes
CREATE CONSTRAINT group_id_unique IF NOT EXISTS FOR (g:Group) REQUIRE g.id IS UNIQUE;

// Create Content nodes
CREATE CONSTRAINT content_id_unique IF NOT EXISTS FOR (c:Content) REQUIRE c.id IS UNIQUE;

// Sample interests for health and wellness
CREATE (fitness:Interest {name: 'Fitness', category: 'Physical Health'});
CREATE (nutrition:Interest {name: 'Nutrition', category: 'Physical Health'});
CREATE (mentalHealth:Interest {name: 'Mental Health', category: 'Mental Wellness'});
CREATE (yoga:Interest {name: 'Yoga', category: 'Physical Health'});
CREATE (meditation:Interest {name: 'Meditation', category: 'Mental Wellness'});
CREATE (weightLoss:Interest {name: 'Weight Loss', category: 'Physical Health'});
CREATE (muscleGain:Interest {name: 'Muscle Gain', category: 'Physical Health'});
CREATE (recovery:Interest {name: 'Recovery', category: 'Mental Wellness'});
CREATE (sports:Interest {name: 'Sports', category: 'Physical Health'});
CREATE (wellness:Interest {name: 'Wellness', category: 'General Health'});

// Create sample groups
CREATE (beginnerFitness:Group {
  id: 'group_beginner_fitness',
  name: 'Beginner Fitness Journey',
  description: 'Support group for fitness beginners',
  memberLimit: 50,
  createdAt: datetime()
});

CREATE (weightLossSupport:Group {
  id: 'group_weight_loss',
  name: 'Weight Loss Warriors',
  description: 'Motivation and support for weight loss goals',
  memberLimit: 100,
  createdAt: datetime()
});

CREATE (mentalHealthSupport:Group {
  id: 'group_mental_health',
  name: 'Mental Health Champions',
  description: 'Safe space for mental health discussions',
  memberLimit: 75,
  createdAt: datetime()
});
