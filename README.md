# Home budgeting - app

## About

This is a front-end of home budgeting app.

![](./docs/preview.png)

## Installation

```bash
$ npm install
```

## Running the app

### Dev

```bash
$ npm run start
```

Open http://localhost:4200 url in web browser.

### Prod

Edit `src/environments/environment.prod.ts` file and set `apiUrl` param which must be url to installed `budget-api` repository.

```bash
$ npm run build
```

Handle `build` directory by web server (eg. Nginx or Apache).

## Roadmap

### 0.7.0

- [ ] Feature: Change password

### 0.6.0

- [ ] Feature: Monthly budget planning
- [ ] Feature: Progress bar of monthly budget plan realisation on budget table
- [ ] Feature: Current month plan realisation on dashboard

### 0.5.0

- [ ] Feature: Statistics for contractors
- [ ] Feature: Statistics for accounts

### 0.4.0

- [ ] Feature: Quarterly expenses by categories chart on dashboard
- [ ] Travis CI and Coveralls integration
- [ ] Unit tests for NGRX store

### 0.3.0

- [x] Feature: Quarterly cash flow chart on dashboard
- [x] Refactoring: NGRX for state management
- [x] Upgrade Angular to v11

### 0.2.0

- [x] Enable serving app as PWA

### 0.1.0

- [x] Removing transaction
- [x] Removing category group
- [x] Removing category
- [x] Add modals for delete operations confirmation
- [x] Transactions list filtering by month
