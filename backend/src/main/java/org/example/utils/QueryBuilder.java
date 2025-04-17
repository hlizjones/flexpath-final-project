package org.example.utils;

import org.springframework.jdbc.core.PreparedStatementCreator;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * A SQL query builder.
 */
public class QueryBuilder {
    private List<String> columns;
    private List<String> tables;
    private List<String> joins;
    private List<String> whereEqualClauses;
    private List<String> whereLikeClauses;
    private List<String> whereComplexClauses;
    private List<Object> equalValues;
    private List<Object> likeValues;
    private List<Object> complexValues;
    private List<String> orderByClauses;
    private List<Object> orderByValues;


    /**
     * Creates a new query builder object.
     */
    public QueryBuilder() {
        this.columns = new ArrayList<String>();
        this.tables = new ArrayList<String>();
        this.joins = new ArrayList<String>();
        this.whereEqualClauses = new ArrayList<String>();
        this.whereLikeClauses = new ArrayList<String>();
        this.whereComplexClauses = new ArrayList<String>();
        this.equalValues = new ArrayList<>();
        this.likeValues = new ArrayList<>();
        this.complexValues = new ArrayList<>();
        this.orderByClauses = new ArrayList<>();
        this.orderByValues = new ArrayList<>();
    }

    /**
     * Creates list of columns for the SELECT clause.
     *
     * @param columns The column names.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder select(String ...columns) {
        this.columns.addAll(Arrays.asList(columns));
        return this;
    }

    /**
     * Creates list of tables for the FROM clause.
     *
     * @param tables The table names.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder from(String ...tables) {
        this.tables.addAll(Arrays.asList(tables));
        return this;
    }

    /**
     * Creates list of JOIN clauses.
     *
     * @param joins JOIN clauses to append to SQL query.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder joins(String ...joins) {
        this.joins.addAll(Arrays.asList(joins));
        return this;
    }

    /**
     * Creates list of WHERE conditions.
     *
     * @param whereEqualClauses WHERE clauses to append to the SQL query.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder whereEqual(String ...whereEqualClauses) {
        this.whereEqualClauses.addAll(Arrays.asList(whereEqualClauses));
        return this;
    }

    /**
     * Creates list of WHERE LIKE conditions.
     *
     * @param whereLikeClauses WHERE LIKE clauses to append to the SQL query.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder whereLike(String ...whereLikeClauses) {
        this.whereLikeClauses.addAll(Arrays.asList(whereLikeClauses));
        return this;
    }

    /**
     * Creates list of complex WHERE conditions.
     *
     * @param whereComplexClauses Complex WHERE clauses to append to the SQL query.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder whereComplex(String ...whereComplexClauses) {
        this.whereComplexClauses.addAll(Arrays.asList(whereComplexClauses));
        return this;
    }

    /**
     * Creates list of query parameters for WHERE LIKE clause.
     *
     * @param equalValues Query parameters.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder equalValues(Object ...equalValues) {
        this.equalValues.addAll(Arrays.asList(equalValues));
        return this;
    }

    /**
     * Creates list of query parameters for WHERE clause.
     *
     * @param likeValues Query parameters.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder likeValues(Object ...likeValues) {
        this.likeValues.addAll(Arrays.asList(likeValues));
        return this;
    }

    /**
     * Creates list of query parameters for complex WHERE clause.
     *
     * @param complexValues Query parameters.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder complexValues(Object ...complexValues) {
        this.complexValues.addAll(Arrays.asList(complexValues));
        return this;
    }

    /**
     * Creates list of ORDER BY conditions.
     *
     * @param orderByClauses ORDER BY clause to append to the SQL query.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder orderByClauses(String ...orderByClauses) {
        this.orderByClauses.addAll(Arrays.asList(orderByClauses));
        return this;
    }

    /**
     * Creates list of query parameters for ORDER BY clauses.
     *
     * @param orderByValues Query parameters.
     * @return QueryBuilder The query builder object.
     */
    public QueryBuilder orderByValues(Object ...orderByValues) {
        this.orderByValues.addAll(Arrays.asList(orderByValues));
        return this;
    }

    /**
     * Builds the SQL query and prepares a new PreparedStatementCreator.
     *
     * @return PreparedStatementCreator
     */
    public PreparedStatementCreator build() {
        StringBuilder sb = new StringBuilder();
        sb.append("SELECT ");
        sb.append(String.join(", ", columns));

        sb.append(" FROM ");
        sb.append(String.join(", ", tables));

        if (!joins.isEmpty()) {
            sb.append(joins);
        }

        if (!whereEqualClauses.isEmpty() || !whereLikeClauses.isEmpty() || !whereComplexClauses.isEmpty()) {

            if (!whereEqualClauses.isEmpty()) {
                sb.append(" WHERE ");
                for (int i = 0; i < whereEqualClauses.size(); i++) {
                    sb.append(whereEqualClauses.get(i)).append(" = ?");
                    if (i < whereEqualClauses.size() - 1) {
                        sb.append(" AND ");
                    }
                }
            }

            if (!whereLikeClauses.isEmpty()) {
                if (!whereEqualClauses.isEmpty()) {
                    sb.append(" AND ");
                } else {
                    sb.append(" WHERE ");
                }
                for (int i = 0; i < whereLikeClauses.size(); i++) {
                    sb.append(whereLikeClauses.get(i)).append(" LIKE ?");
                    if (i < whereLikeClauses.size() - 1) {
                        sb.append(" AND ");
                    }
                }
            }

            if (!whereComplexClauses.isEmpty()) {
                if (!whereEqualClauses.isEmpty() || !whereLikeClauses.isEmpty()) {
                    sb.append(" AND ");
                } else {
                    sb.append(" WHERE ");
                }
                for (int i = 0; i < whereComplexClauses.size(); i++) {
                    sb.append(whereComplexClauses.get(i));
                    if (i < whereComplexClauses.size() - 1) {
                        sb.append(" AND ");
                    }
                }
            }
        }

        if (!orderByClauses.isEmpty()) {
            sb.append(" ORDER BY ");
            sb.append(String.join(", ", orderByClauses));
        }

        PreparedStatementCreator psc = con -> {
            PreparedStatement ps = con.prepareStatement(sb.toString());
            if (!equalValues.isEmpty()) {
                for (int i = 0; i < equalValues.size(); i++) {
                    if (equalValues.get(i) instanceof Integer) {
                        ps.setInt(i + 1, (int) equalValues.get(i));
                    } else if (equalValues.get(i) instanceof String) {
                        ps.setString(i + 1, (String) equalValues.get(i));
                    } else if (equalValues.get(i) instanceof Boolean) {
                        ps.setBoolean(i + 1, (Boolean) equalValues.get(i));
                    }
                }
            }
            if (!likeValues.isEmpty()) {
                for (int i = 0; i < likeValues.size(); i++) {
                    if (likeValues.get(i) instanceof Integer) {
                        ps.setInt(i + equalValues.size() + 1, (int) likeValues.get(i));
                    } else if (likeValues.get(i) instanceof String) {
                        ps.setString(i + equalValues.size() + 1, (String) likeValues.get(i));
                    } else if (likeValues.get(i) instanceof Boolean) {
                        ps.setBoolean(i + equalValues.size() + 1, (Boolean) likeValues.get(i));
                    }
                }
            }
            if (!complexValues.isEmpty()) {
                for (int i = 0; i < complexValues.size(); i++) {
                    if (complexValues.get(i) instanceof Integer) {
                        ps.setInt(i + equalValues.size() + likeValues.size() + 1, (int) complexValues.get(i));
                    } else if (complexValues.get(i) instanceof String) {
                        ps.setString(i + equalValues.size() + likeValues.size() + 1, (String) complexValues.get(i));
                    } else if (complexValues.get(i) instanceof Boolean) {
                        ps.setBoolean(i + equalValues.size() + likeValues.size() + 1, (Boolean) complexValues.get(i));
                    }
                }
            }
            if (!orderByValues.isEmpty()) {
                for (int i = 0; i < orderByValues.size(); i++) {
                    if (orderByValues.get(i) instanceof Integer) {
                        ps.setInt(i + equalValues.size() + likeValues.size() + complexValues.size() + 1, (int) orderByValues.get(i));
                    } else if (orderByValues.get(i) instanceof String) {
                        ps.setString(i + equalValues.size() + likeValues.size() + complexValues.size() + 1, (String) orderByValues.get(i));
                    } else if (orderByValues.get(i) instanceof Boolean) {
                        ps.setBoolean(i + equalValues.size() + likeValues.size() + complexValues.size() + 1, (Boolean) orderByValues.get(i));
                    }
                }
            }
            return ps;
        };

        return psc;
    }
}
