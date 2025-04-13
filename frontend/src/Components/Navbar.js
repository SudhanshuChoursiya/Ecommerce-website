"use client";
import styles from "./Navbar.module.css";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/authContext.js";
import Link from "next/link";
import Image from "next/image";
import UserIconMenuPopup from "./UserIconMenu.js";
import { Menu, ShoppingCartSharp, SearchOutlined } from "@mui/icons-material";
import Sidebar from "./Sidebar.js";

const Navbar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState(false);
    const searched = searchParams.get("query");
    const [searchQuery, setSearchQuery] = useState(searched ? searched : "");

    const [suggestions, setSuggestions] = useState([]);
    const searchInputRef = useRef(null);
    const suggestionContainerRef = useRef(null);
    const [filteredSuggestion, setFilterSuggestion] = useState([]);
    const [showSuggestion, setShowSuggestion] = useState(false);

    const cartItem = useSelector(state => state.cart.cartItem);

    const { isLoggedin } = useContext(AuthContext);

    const hideNavbarDropdown = () => {
        setShowMenu(false);
    };

    const base_url = process.env.NEXT_PUBLIC_BASE_URL;

    const logedOutUser = async () => {
        const response = await fetch(`${base_url}/logout`, {
            method: "POST",
            credentials: "include"
        });
        const data = await response.json();
        if (response.status === 200) {
            router.push("/login", { scroll: false });
        }
    };

    const getSuggestions = async e => {
        e.preventDefault();

        setSearchQuery(e.target.value);
        //get suggestions from api through product title

        try {
            const response = await fetch(
                `https://dummyjson.com/products/search?q=${searchQuery}`,
                {
                    method: "GET"
                }
            );
            const data = await response.json();
            if (response.status === 200 || !data) {
                const productTitle = data.products.map(product => {
                    return product.title;
                });
                setSuggestions(productTitle);
            } else {
                setShowSuggestion(false);
                setSuggestions([]);
                setFilterSuggestion([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSuggestionClick = (e, suggestion) => {
        setSearchQuery(suggestion);
        searchProducts(e, suggestion);
        setSuggestions([]);
        setFilterSuggestion([]);
    };

    const searchProducts = (e, suggestion) => {
        e.preventDefault();
        router.push(
            `/search-product/searchQuery?query=${
                suggestion ? suggestion : searchQuery
            }`,
            {
                scroll: false
            }
        );
    };

    const handleClickOutside = e => {
        if (
            searchInputRef.current &&
            !searchInputRef.current.contains(e.target) &&
            suggestionContainerRef.current &&
            !suggestionContainerRef.current.contains(e.target)
        ) {
            setShowSuggestion(false);
            setSuggestions([]);
            setFilterSuggestion([]);
        }
    };

    useEffect(() => {
        if (searchQuery.length < 1 || undefined) {
            setShowSuggestion(false);
            setFilterSuggestion([]);
            return;
        }
        const filtered = suggestions?.filter(suggestion => {
            return suggestion.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilterSuggestion(filtered);
        setShowSuggestion(filtered.length > 0);
    }, [suggestions, searchQuery]);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        hideNavbarDropdown();
        setSuggestions([]);
        setFilterSuggestion([]);
        setShowSuggestion(false);
        if (!pathname.startsWith("/search-product/searchQuery")) {
            setSearchQuery("");
        }
    }, [pathname, searched]);

    return (
        <nav
            className={
                showMenu
                    ? `${styles.nav} ${styles.nav__height} ${styles.navbar__scroll}`
                    : `${styles.nav} ${styles.navbar__scroll}`
            }
        >
            <div className={styles.logo__container}>
                <Image
                    src="/Shoping-logo.svg"
                    height={31}
                    width={31}
                    alt="logo"
                />
                <h1>Shopzy</h1>
            </div>

            <div className={styles.search__container}>
                <form onSubmit={searchProducts}>
                    <input
                        type="search"
                        name="search"
                        placeholder="Search products"
                        value={searchQuery}
                        onChange={getSuggestions}
                        autoComplete="off"
                        ref={searchInputRef}
                    />
                    {showSuggestion ? (
                        <div
                            className={styles.suggestions__container}
                            ref={suggestionContainerRef}
                        >
                            <ul className={styles.suggestion__list__container}>
                                {filteredSuggestion.map((suggestion, index) => {
                                    return (
                                        <li
                                            className={styles.suggestion__list}
                                            key={index}
                                            onClick={e =>
                                                handleSuggestionClick(
                                                    e,
                                                    suggestion
                                                )
                                            }
                                        >
                                            {suggestion}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ) : (
                        ""
                    )}

                    <span
                        className={styles.search__btn}
                        onClick={searchProducts}
                    >
                        <SearchOutlined className={styles.search__icon} />
                    </span>
                </form>
            </div>

            <ul className={styles.list__container}>
                <Link href="/" onClick={hideNavbarDropdown}>
                    <li>Home</li>
                </Link>
                {!isLoggedin ? (
                    <>
                        <Link href="/login">
                            <li>Login</li>
                        </Link>
                    </>
                ) : (
                    <>
                        <UserIconMenuPopup
                            logedOutUser={logedOutUser}
                            isLoggedin={isLoggedin}
                        />
                    </>
                )}
            </ul>

            <div className={styles.cart__icon__container}>
                <Link href="/cart">
                    <div className={styles.cart__icon__wrapper}>
                        <ShoppingCartSharp className={styles.cart__icon} />

                        <div className={styles.cart__count}>
                            {cartItem.length}
                        </div>
                    </div>
                </Link>
            </div>

            {/*Custamization for small screen devices*/}

            <div className={styles.profile__container}>
                <UserIconMenuPopup
                    logedOutUser={logedOutUser}
                    isLoggedin={isLoggedin}
                />
            </div>

            <div
                className={styles.hamburger__container}
                onClick={() => setShowMenu(!showMenu)}
            >
                <Menu className={styles.hamburger__icon} />
            </div>

            <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
        </nav>
    );
};

export default Navbar;
