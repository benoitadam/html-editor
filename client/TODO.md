[ ] Garder la structure children parentId dans le moteur pour plus de rapidité



[ ] Multi target
    "targets": {
      "modern": {
        "includeNodeModules": {},
        "engines": {
          "browsers": "Chrome 80"
        }
      },
      "legacy": {
        "includeNodeModules": {},
        "engines": {
          "browsers": "> 0.5%, last 2 versions, not dead"
        }
      },
    }