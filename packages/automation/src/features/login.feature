Feature: The Internet Guinea Pig Website

  Scenario Outline: As a user, I can log into the secure area

    Given I navigate to "https://example.com"
    Then content for "home.body.input" should be
    """
    Example Domain
    This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.
    More information...
    """