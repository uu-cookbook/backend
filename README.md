# backend

# uuCookBook

## before starting working on project:
```
git pull
npm i
```

### how to push to different branch
```
git pull
git checkout -b [name_of_your_new_branch]
git push origin [name_of_your_new_branch]
```

### API routes

> api.uu.vojtechpetrasek.com/v3

1. /register
    - require
        - name
        - lastname
        - nickname (unique)
        - email (unique)
        - password

2. /login
    - require
        - email
        - password
    - return
        - user auth token

3. /user
    - require
        - user auth token
    - return
        - user data
