setup-fnm:
    grep -qF 'fnm env' ~/.zshrc || echo 'eval "$(fnm env --use-on-cd --shell zsh)"' >> ~/.zshrc
    source ~/.zshrc
    fnm install