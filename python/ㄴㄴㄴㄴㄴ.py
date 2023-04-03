import openai_secret_manager
import hanspell

secrets = openai_secret_manager.get_secret("pabot")

hanspell_key = secrets["hanspell"]
hanspell_checker = hanspell.Client(api_key=hanspell_key)

checked_sent, misspelled = hanspell_checker.check(sentence)
