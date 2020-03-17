1. cd into project folder
2. git branch (make sure you're on the master branch)
2. git pull origin master (get latest updates from origin)

3. git checkout -b {branch-name} (create branch)
4. make changes to files 
5. git add . (stage changes)
6. git commit -m "{make changes}" (commit changes)

7. git checkout master (switch to master branch)
8. git pull origin master (make sure you are up to date)

9. git checkout {branch-name}
10. git merge master (merge any updates from step 8 into {branch-name})
11. git push origin {branch-name} (push changes from branch to origin)

12. go to github and create a pull request for the branch you just pushed.

13. git checkout master (switch to master branch)
14. git pull origin master (pull updates you just pushed in step 11)
15. git branch -d {branch-name} (delete the local branch)git