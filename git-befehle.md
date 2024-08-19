# Git-Befehle Cheat Sheet

Diese `README.md` enthält eine Zusammenfassung der wichtigsten Git-Befehle für die tägliche Arbeit mit Git.

## 1. Git-Konfiguration

### Globalen Benutzernamen und E-Mail festlegen

```bash
    git config --global user.name "Dein Name"
    git config --global user.email "deine.email@example.com"

    // Erhöhe die Buffer-Größe auf 500GB
    git config --global http.postBuffer 524288000
```

### Konfiguration anzeigen

```bash
    git config --list
```

## 2. Repository initialisieren und klonen

### Neues Git-Repository initialisieren

```bash
    git init
```

### Bestehendes Repository klonen

```bash
    git clone <repository-url>
```

## 3. Änderungen nachverfolgen

### Aktuellen Status anzeigen

```bash
    git status
```

### Dateien zum Staging-Bereich hinzufügen

```bash
    git add <datei>
    # Alle Änderungen hinzufügen
    git add .
```

### Änderungen committen

```bash
    git commit -m "Deine Commit-Nachricht"
```

### Änderungen in einem Commit und im Staging-Bereich anzeigen

```bash
    git diff
```

## 4. Branches

### Lokalen Branch erstellen

```bash
    git branch <branch-name>
```

### Zu einem anderen Branch wechseln

```bash
    git checkout <branch-name>
```

### Branch erstellen und wechseln

```bash
    git checkout -b <branch-name>
```

### Lokale Branches anzeigen

```bash
    git branch
```

### Remote Branches anzeigen

```bash
    git branch -r
```

### Lokale und Remote Branches anzeigen

```bash
    git branch -a
```

### Lokalen Branch löschen

```bash
    git branch -d <branch-name>
```

### Branch umbenennen

```bash
    git branch -m <neuer-branch-name>
```

## 5. Zusammenführen und Rebasen

### Branch in den aktuellen Branch mergen

```bash
    git merge <branch-name>
```

### Interaktives Rebase durchführen

```bash
    git rebase -i <commit-id>
```

## 6. Remote-Repository

### Änderungen zum Remote-Repository pushen

```bash
    git push origin <branch-name>
```

### Änderungen vom Remote-Repository pullen

```bash
    git pull
```

### Remote-Repository hinzufügen

```bash
    git remote add origin <repository-url>
```

### Liste der Remote-Repositories anzeigen

```bash
    git remote -v
```

### Remote-Branch löschen

```bash
    git push origin --delete <branch-name>
```

## 7. Logs und History

### Commit-History anzeigen

```bash
    git log
```

### Einzeilige Commit-History anzeigen

```bash
    git log --oneline
```

## 8. Stash (Änderungen temporär speichern)

### Änderungen stashen

```bash
    git stash
```

### Gestashte Änderungen anwenden

```bash
    git stash pop
```

### Stash anzeigen

```bash
    git stash list
```

### Bestimmten Stash anwenden

```bash
    git stash apply <stash@{n}>
```

## 9. Andere nützliche Befehle

### Datei aus dem Staging-Bereich entfernen

```bash
    git reset <datei>
```

### Zu einem bestimmten Commit zurückkehren

```bash
    git checkout <commit-id>
```

### Letzten Commit überschreiben (vorsichtig verwenden)

```bash
    git commit --amend -m "Neue Commit-Nachricht"
```
