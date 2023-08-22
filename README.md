# show recommendation engine version 2

## Creating Feature Branches and Merging to Frontend Branch
1. Ensure frontend branch is up to date with Dev
2. Git checkout -b (your-name)/(featureName)
- ex. 'git checkout -b john/coolFeature
- Finish feature and commit
3. Git push origin (your-name)/(featureName)
4. Git checkout initial-frontend
5. Git pull origin initial-frontend
6. Git merge (your-name)/(featureName)
7. Add, commit, -> git push origin initial-frontend
